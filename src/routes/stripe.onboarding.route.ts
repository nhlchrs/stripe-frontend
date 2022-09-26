import { CreateStripeOnboarding } from '@dtos/stripe.onboarding.dto';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StripeOnboardController from '@controllers/stripe.onboard.controller';
import validationMiddleware from '@middlewares/validation.middleware';

class StripeOnboardingRoute implements Routes {
  public path = '/stripe-onboarding';
  public router = Router();
  public stripeOnboardController = new StripeOnboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create-account`, validationMiddleware(CreateStripeOnboarding, 'body'), this.stripeOnboardController.createLink);
  }
}

export default StripeOnboardingRoute;