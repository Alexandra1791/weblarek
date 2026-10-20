import { IBuyer, FormErrors, TPayment } from "../../types";

export class OrderData {
  protected buyer:IBuyer = {
  payment: '',
  email: '',
  phone: '',
  address: ''
  };

  constructor() {

  }

  getBuyerData(): IBuyer {
    return this.buyer
  }

  clear(): void {
    this.buyer = {
      payment: '',
      email: '',
      phone: '',
      address: ''
    };
  }

  setField(field: keyof IBuyer, value: string): void {
    if (field === 'payment') {
      this.buyer[field] = value as TPayment | '';
    } else {
      this.buyer[field] = value;
    }
  }

  validateData(): FormErrors {
    const errors: FormErrors = {};

    if (!this.buyer.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }

    if (!this.buyer.address) {
      errors.address = 'Необходимо указать адрес доставки';
    }

    if (!this.buyer.email) {
      errors.email = 'Необходимо указать email';
    }

    if(!this.buyer.phone) {
      errors.phone = 'Необходимо указать телефон'
    }

    return errors;
  }
}