import React, { useState } from 'react'
import { formatAmountForDisplay } from '../../../config/Utils'
import StripeApi from '../../../api/stripe'
import './index.less'
import getStripe from './get-stripejs'
import { Button } from '@material-ui/core'

const CheckoutForm = ({amount, disabled=false}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit= async (e) => {
    e.preventDefault()
    setLoading(true)
    // Create a Checkout Session.
    try{
    const response = await StripeApi.createSession({amount: amount})
    const stripe = await getStripe()
    await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.data.id,
    })
    setLoading(false)
  }catch(error){
    setLoading(false)
  }
  }

  return (
      <Button
        variant="contained"
        color="primary"
        disabled={loading || disabled}
        onClick={handleSubmit}
        size="medium"
      >
        Pay {formatAmountForDisplay(amount, 'INR')}
      </Button>
  )
}

export default CheckoutForm