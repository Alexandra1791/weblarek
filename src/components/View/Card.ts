import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard {
  title: string;
  price: number | null;
  category?: string;
  image?: string;
  description?: string;
  index?: number;
  buttonText?: string;
  buttonDisabled?: boolean;
}

export class Card extends Component<ICard> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>('.card__title', container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', container);
  }

  set title(value:string) {
    this.titleElement.textContent = value;
  }

  set price(value: number | null) {
    if (value === null) {
      this.priceElement.textContent = 'Бесценно';
    } else {
      this.priceElement.textContent = `${value} синапсов`;
    }
  }
}