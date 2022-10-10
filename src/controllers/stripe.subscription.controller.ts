import { NextFunction, Request, Response } from 'express';
import { STRIPE_SECRET, STRIP_COUNTRY, STRIPE_REFRESH_URL, STRIPE_RETURN_URL } from '@config';
// import { Vendor } from '@interfaces/vendor.interface';
// import { CreateStripeSaveAccount } from '@/dtos/stripe.saveaccount.dto';
import VendorService from '@services/vendor.service';

const stripe = require('stripe')(STRIPE_SECRET);

class StripeSubscriptionController {
  public vendorService = new VendorService();

  public createCustomer = async (name: string, email: string) => {
    return await stripe.customers.create({
      name: name,
      email: email,
      description: 'Test customer for subscription',
    });
  };

  public subscribeCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await this.createCustomer(req.body.name, req.body.email);
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {price: req.body.price_id},
        ],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

      res.status(200).json({ data: clientSecret, message: 'subscriptionClientSecret' });
    } catch (error) {
      next(error);
    }
  }
}

export default StripeSubscriptionController;