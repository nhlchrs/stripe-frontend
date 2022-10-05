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
    this.router.get(`${this.path}/config`, this.stripeOnboardController.getPublishedKey);
    this.router.post(`${this.path}/create-account`, validationMiddleware(CreateStripeOnboarding, 'body'), this.stripeOnboardController.createLink);
    // this.router.get(`${this.path}/save-account-id/:id`, this.stripeOnboardController.saveAccountId);
  }
}

export default StripeOnboardingRoute;