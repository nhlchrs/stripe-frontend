import { IsEmail, IsString, IsInt, IsDecimal, IsOptional } from 'class-validator';

export class CreateStripeCheckout {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public stripe_account_id: string;

  @IsOptional()
  public amount: number;
}
