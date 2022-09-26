import { IsEmail, IsString } from 'class-validator';

export class CreateStripeOnboarding {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;
}
