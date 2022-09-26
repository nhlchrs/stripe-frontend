import { IsEmail, IsString, IsInt } from 'class-validator';

export class CreateStripeCheckout {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public stripe_account_id: string;

  @IsInt()
  public amount: number;
}
