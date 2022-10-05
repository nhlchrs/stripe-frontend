import { CreateStripeSaveAccount } from '@dtos/stripe.saveaccount.dto';
import { HttpException } from '@exceptions/HttpException';
import { Vendor } from '@interfaces/vendor.interface';
import { isEmpty } from '@utils/util';
import vendorModel from '@models/vendor.model';

class VendorService {
  public vendor = vendorModel;
  public async createVendor(vendorData: CreateStripeSaveAccount): Promise<Vendor> {
    if (isEmpty(vendorData)) throw new HttpException(400, "vendor Data is empty");

    const createVendorData: Vendor = await this.vendor.create({ ...vendorData });

    return createVendorData;
  }

}

export default VendorService;
