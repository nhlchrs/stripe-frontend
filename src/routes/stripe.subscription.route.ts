import { CreateStripeOnboarding } from '@dtos/stripe.onboarding.dto';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StripeSubscriptionController from '@controllers/stripe.subscription.controller';
import validationMiddleware from '@middlewares/validation.middleware';

class StripeSubscriptionRoute implements Routes {
  public path = '/stripe-subscription';
  public router = Router();
  public stripeSubscriptionController = new StripeSubscriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.stripeSubscriptionController.subscribeCustomer);
  }
}

export default StripeSubscriptionRoute;