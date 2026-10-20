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
}

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