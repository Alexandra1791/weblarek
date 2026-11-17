import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ISuccess,ISuccessAction } from "../../types";


export class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ISuccessAction) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
  
    if (actions?.onClick) {
      this.closeButton.addEventListener('click', actions.onClick);
    }
  }

  set total(value:number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}