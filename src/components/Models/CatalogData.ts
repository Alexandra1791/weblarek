import { IProduct } from "../../types";

export class Catalogdata {
  items: IProduct[] = [];
  preview: string | null = null;

  constructor() {

  }

  setItems(products: IProduct[]): void {
    this.items = products;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getProduct(productId: string): IProduct | null {
    return this.items.find(item => item.id === productId) || null;
  }

  setPreview(productId: string): void {
    this.preview = productId;
  }
  getPreview(): IProduct | null {
    if (!this.preview) {
      return null;
    }
    return this.getProduct(this.preview);
  }
}