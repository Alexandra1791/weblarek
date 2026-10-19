import { IApi, IProductResponse, IOrderRequest, IOrderResult } from "../types";

export class AppApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts(): Promise<IProductResponse> {
    return this._baseApi.get<IProductResponse>('/product');
  }

  postOrder(orderData: IOrderRequest):Promise<IOrderResult> {
    return this._baseApi.post<IOrderResult>('/order', orderData);
  }
}