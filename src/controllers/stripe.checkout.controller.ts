import { NextFunction, Request, Response } from 'express';
import { STRIPE_SECRET, STRIPE_APPLICATION_FEE } from '@config';
const stripe = require('stripe')(STRIPE_SECRET);

class StripeCheckoutController {

  public checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name,
        description: 'Intent to purchase some product',
      });
      
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        amount: parseInt(req.body.amount as string) * 100,
        currency: 'inr',
        application_fee_amount: parseInt(STRIPE_APPLICATION_FEE as string) * 100,
        transfer_data: {
          destination: req.body.stripe_account_id,
        },
      });
  
      const clientSecret = paymentIntent.client_secret;

      res.status(200).json({ data: clientSecret, message: 'checkout' });
    } catch (error) {
      next(error);
    }
  };
}

export default StripeCheckoutController;