import { IProduct } from "../../types";

export class Catalogdata {
  protected items: IProduct[] = [];
  protected previewId: string | null = null;

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

  setPreviewId(productId: string): void {
    this.previewId = productId;
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