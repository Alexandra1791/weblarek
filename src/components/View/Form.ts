import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IFormState } from "../../types";

export abstract class Form<T> extends Component<T & IFormState> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]',this.container);
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
    
    container.addEventListener('input',(e:Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    container.addEventListener('submit',(e:Event) => {
      e.preventDefault();
      this.events.emit(`${container.name}:submit`);
    });
  }

  protected onInputChange(field: keyof T, value:string):void {
    const formName = (this.container as HTMLFormElement).name;
    this.events.emit(`${formName}.${String(field)}:change`, {
      field,
      value,      
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}