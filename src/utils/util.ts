/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
import { STRIPE_APPLICATION_FEE } from '@config';

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const application_fees = (amount: number) => {
  let application_fee = (3.5 * amount) / 100;
  console.log(amount, application_fee, "niajooko")
  console.log(Math.round(application_fee * 100))
  return Math.round(application_fee * 100);
}
