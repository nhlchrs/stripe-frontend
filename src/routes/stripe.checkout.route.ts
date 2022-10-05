import { CreateStripeCheckout } from '@dtos/stripe.checkout.dto';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import stripeOnboardController from '@controllers/stripe.checkout.controller';
import validationMiddleware from '@middlewares/validation.middleware';

class StripeCheckoutRoute implements Routes {
  public path = '/stripe-checkout';
  public router = Router();
  public StripeCheckoutController = new stripeOnboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateStripeCheckout, 'body'), this.StripeCheckoutController.checkout);
  }
}

export default StripeCheckoutRoute;