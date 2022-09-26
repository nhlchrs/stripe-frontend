import { NextFunction, Request, Response } from 'express';
import { STRIPE_SECRET, STRIP_COUNTRY, STRIPE_REFRESH_URL, STRIPE_RETURN_URL } from '@config';
const stripe = require('stripe')(STRIPE_SECRET);
var url = require('url');

class StripeOnboardController {

  public createLink = async (req: Request, res: Response, next: NextFunction)=>{
    try {
      const account = await stripe.accounts.create({
        type: 'standard',
        country: STRIP_COUNTRY,
        email: req.body.email,
      });
      
      const accountLink = await this.redirectUrl(account.id, req.protocol+"://"+req.headers.host+STRIPE_REFRESH_URL, req.protocol+"://"+req.headers.host+STRIPE_RETURN_URL);

      res.status(200).json({ data: accountLink, message: 'createStripeAccountLink' });
    } catch (error) {
      next(error);
    }
  };

  protected redirectUrl = async (account_id: string, refresh_url: string, return_url: string)=>{
    return await stripe.accountLinks.create({
      account: account_id,
      refresh_url: refresh_url,
      return_url: return_url,
      type: 'account_onboarding',
    });
  }
}

export default StripeOnboardController;