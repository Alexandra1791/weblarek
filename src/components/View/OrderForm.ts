import { Form } from "./Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { TPayment, IOrderForm } from "../../types";

export class OrderForm extends Form<IOrderForm> {
  protected onlineButton: HTMLButtonElement;
  protected cashButton:  HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.onlineButton = ensureElement<HTMLButtonElement>('button[name="card"]', container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', container);
    this.onlineButton.addEventListener('click', () => {
      this.onInputChange('payment', 'card');
    });
    this.cashButton.addEventListener('click', () => {
      this.onInputChange('payment', 'cash');
    });
  }

  set payment(value: TPayment| '') {
    this.onlineButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}