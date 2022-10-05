import { NextFunction, Request, Response } from 'express';
import { STRIPE_SECRET, STRIPE_CURRENCY } from '@config';
import { application_fees } from '@/utils/util';
const stripe = require('stripe')(STRIPE_SECRET);

class StripeCheckoutController {

  public checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      const customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name,
        // description: 'Intent to purchase some product',
      });
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        amount: req.body.amount * 100,
        currency: STRIPE_CURRENCY,
        application_fee_amount: application_fees(req.body.amount),
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