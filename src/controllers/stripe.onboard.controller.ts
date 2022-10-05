import { NextFunction, Request, Response } from 'express';
import { STRIPE_SECRET, STRIP_COUNTRY, STRIPE_REFRESH_URL, STRIPE_RETURN_URL } from '@config';
// import { Vendor } from '@interfaces/vendor.interface';
// import { CreateStripeSaveAccount } from '@/dtos/stripe.saveaccount.dto';
import VendorService from '@services/vendor.service';

const stripe = require('stripe')(STRIPE_SECRET);

class StripeOnboardController {
  public vendorService = new VendorService();

  public getPublishedKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send({
        publishableKey: process.env.STRIPE_KEY,
      });
    } catch (error) {
      next(error);
    }
  }

  public createLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await stripe.accounts.create({
        type: 'standard',
        country: STRIP_COUNTRY,
        email: req.body.email,
      });

      const accountLink = await this.redirectUrl(account.id, req.protocol + "://" + req.headers.host + STRIPE_REFRESH_URL, req.protocol + "://" + req.headers.host + STRIPE_RETURN_URL);

      res.status(200).json({ data: accountLink, acc_id: account.id, message: 'createStripeAccountLink' });
    } catch (error) {
      next(error);
    }
  };

  protected redirectUrl = async (account_id: string, refresh_url: string, return_url: string) => {
    console.log(`${return_url}?acc_id=${account_id}`)
    return await stripe.accountLinks.create({
      account: account_id,
      refresh_url: refresh_url,
      return_url: `${return_url}?acc_id=${account_id}`,
      type: 'account_onboarding',
    });
  }


  //For our Further use
  // public saveAccountId = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const vendorData: CreateStripeSaveAccount = req.params;
  //     console.log(vendorData, "nihal")
  //     const createVendorData: Vendor = await this.vendorService.createVendor(vendorData);
  //     res.status(201).json({ data: createVendorData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

}

export default StripeOnboardController;