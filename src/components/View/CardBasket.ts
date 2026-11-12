import { Card, ICardActions} from './Card';
import { ensureElement } from '../../utils/utils';

export class CardBasket extends Card {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
    if (actions?.onClick) {
      this.deleteButton.addEventListener('click', actions.onClick);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}