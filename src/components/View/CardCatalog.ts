import { Card, ICardActions} from './Card';
import { ensureElement } from '../../utils/utils';
import { CDN_URL, categoryMap} from '../../utils/constants';

export class CardCatalog extends Card {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);

    if (actions?.onClick) {
      container.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string){
    this.categoryElement.textContent = value;
    this.categoryElement.className = 'card__category';
    const modifier = categoryMap[value as keyof typeof categoryMap];
    if (modifier) {
      this.categoryElement.classList.add(modifier);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}${value}`, this.titleElement.textContent|| ''); 
  }
}