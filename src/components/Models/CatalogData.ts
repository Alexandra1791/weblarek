import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalogdata {
  protected items: IProduct[] = [];
  protected previewId: string | null = null;

  constructor(protected events: IEvents) {

  }

  setItems(products: IProduct[]): void {
    this.items = products;
    this.events.emit('items:changed', {items: this.items});
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getProduct(productId: string): IProduct | null {
    return this.items.find(item => item.id === productId) || null;
  }

  setPreviewId(productId: string): void {
    this.previewId = productId;
    this.events.emit('preview:changed', { previewId: this.previewId});
  }

  getPreviewId(): string | null {
    return this.previewId;
  }

  getPreviewProduct(): IProduct | null {
    if (!this.previewId) {
      return null;
    }
    return this.getProduct(this.previewId);
  }
}