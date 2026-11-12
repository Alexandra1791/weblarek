import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class BasketData {
  protected items: IProduct[] = [];

  constructor(protected events: IEvents) {

  }

  getItems(): IProduct[] {
    return this.items;
  }

  add(product: IProduct): void {
    this.items.push(product);
    this.events.emit('basket:changed');
  }

  remove(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
    this.events.emit('basket:changed');
  }

  clear(): void {
    this.items = [];
    this.events.emit('basket:changed');
  }

  getCount(): number {
    return this.items.length
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0),0);
  }

  hasProduct(productId: string): boolean {
    return this.items.some(item => item.id === productId);
  }
}