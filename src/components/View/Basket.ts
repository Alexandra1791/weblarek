import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement, createElement } from "../../utils/utils";

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasketView> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.listElement = ensureElement<HTMLElement>('.basket__list', container);
    this.totalElement = ensureElement<HTMLElement>('.basket__price', container);
    this.button = ensureElement<HTMLButtonElement>('.basket__button', container);
    this.button.addEventListener('click', () => {
      this.events.emit('order:open');
    });
    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.listElement.replaceChildren(...items);
      this.button.disabled = false;
    } else {
      this.listElement.replaceChildren(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста',
        })
      );
      this.button.disabled = true;
    }
  }

  set total(value: number) {
    this.totalElement.textContent = `${value} синапсов`;
  }
}