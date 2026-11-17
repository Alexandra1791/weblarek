export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export interface IBuyer {
    payment: TPayment | '';
    address: string;
    email: string;
    phone: string;
}

export type TPayment = 'card' | 'cash';

export type FormErrors = Partial<Record<keyof IBuyer, string>>;


export interface IProductResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IModalData {
  content: HTMLElement;
}

export interface IFormState {
  valid: boolean;
  errors: string;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard {
  title: string;
  price: number | null;
  category?: string;
  image?: string;
  description?: string;
  index?: number;
  buttonText?: string;
  buttonDisabled?: boolean;
}

export interface IHeader {
  counter: number;
}

export interface IGallery {
  catalog: HTMLElement[];
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export type IOrderForm = Pick<IBuyer, 'payment' | 'address'>;

export type IContactsForm = Pick<IBuyer, 'email' | 'phone'>;

export interface ISuccess {
  total: number;
}
export interface ISuccessAction {
  onClick: () => void;
}