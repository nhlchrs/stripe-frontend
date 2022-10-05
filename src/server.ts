import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from './routes/users.route';
import StripeOnboardingRoute from './routes/stripe.onboarding.route';
import StripeCheckoutRoute from './routes/stripe.checkout.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new StripeOnboardingRoute(), new StripeCheckoutRoute()]);

app.listen();
