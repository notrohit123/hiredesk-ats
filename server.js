import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const app = express()
const PORT = process.env.PORT || 3003

// Railway terminates TLS at its proxy layer, so Express sees plain http.
// trust proxy tells Express to read X-Forwarded-Proto so req.protocol
// returns 'https' and Stripe gets correct redirect URLs.
app.set('trust proxy', 1)

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// Creates a Stripe Checkout session for subscription billing.
// The frontend sends the priceId for whichever tier the user picked,
// and we redirect them to Stripe's hosted checkout page.
app.post('/api/checkout', async (req, res) => {
  try {
    const { priceId } = req.body
    const origin = process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('stripe checkout error:', err.message)
    // Return a generic message instead of leaking Stripe internals to the client
    res.status(500).json({ error: 'Could not create checkout session' })
  }
})

// Verifies payment status after Stripe redirects the user back.
// The frontend calls this with the session_id query param to confirm
// the subscription went through before showing the success state.
app.get('/api/checkout/verify', async (req, res) => {
  try {
    const { session_id } = req.query
    if (!session_id) {
      return res.status(400).json({ error: 'missing session_id' })
    }
    const session = await stripe.checkout.sessions.retrieve(session_id)
    res.json({
      status: session.payment_status,
      customer_email: session.customer_details?.email,
      subscription_id: session.subscription,
    })
  } catch (err) {
    console.error('stripe verify error:', err.message)
    res.status(500).json({ error: 'Could not verify payment' })
  }
})

// Health check endpoint for Railway's deployment health monitoring
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// SPA catch-all: serve index.html for any route that isn't an API endpoint
// or a static file, so client-side routing works on page refresh.
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`hiredesk server running on port ${PORT}`))
