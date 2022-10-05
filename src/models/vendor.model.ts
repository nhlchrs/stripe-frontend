import { model, Schema, Document } from 'mongoose';
import { Vendor } from '@interfaces/vendor.interface';

const vendorSchema: Schema = new Schema({
  user_id: {
    type: String,
    default: "defaultValues"
  },
  stripe_account_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const vendorModel = model<Vendor & Document>('Vendor', vendorSchema);

export default vendorModel;
