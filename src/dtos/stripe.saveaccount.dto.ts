import { IsString } from 'class-validator';

export class CreateStripeSaveAccount {
  @IsString()
  public stripe_account_id: string;
}
