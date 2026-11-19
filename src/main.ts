import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { Api } from './components/base/Api';
import { AppApi } from './components/AppApi';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IBuyer, IProduct } from './types';



import { CatalogData } from './components/Models/CatalogData';
import { BasketData } from './components/Models/BasketData';
import { OrderData } from './components/Models/OrderData';

import { Header } from './components/View/Header';
import { Gallery } from './components/View/Gallery';
import { Modal } from './components/View/Modal';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { CardBasket } from './components/View/CardBasket';
import { Basket } from './components/View/Basket';
import { OrderForm } from './components/View/OrderForm';
import { ContactsForm } from './components/View/ContactsForm';
import { Success } from './components/View/Success';

const events = new EventEmitter();
const baseApi = new Api(API_URL);
const appApi = new AppApi(baseApi);

const catalogModel = new CatalogData(events);
const basketModel = new BasketData(events);
const orderModel = new OrderData(events);

const headerContainer = ensureElement<HTMLElement>('.header');
const galleryContainer = ensureElement<HTMLElement>('.gallery');
const modalContainer = ensureElement<HTMLElement>('#modal-container');

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const header = new Header(headerContainer, events);
const gallery = new Gallery(galleryContainer);
const modal = new Modal (modalContainer);

const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
  onClick:() => events.emit('card:toggle'),
});
const basketView = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const successView = new Success(cloneTemplate(successTemplate), {
  onClick: () => events.emit('success:click'),
});


events.on('items:changed', () => {
  const cards = catalogModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item),
    });
    return card.render ({
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
    });
  });

  gallery.render({ catalog: cards });
});

events.on('preview:changed', () => {
  const product = catalogModel.getPreviewProduct();
  if (!product) return;

  const isInBasket = basketModel.hasProduct(product.id);
  const isPriceless = product.price === null;

  let buttonText = 'Купить';
  if (isPriceless) {
    buttonText = 'Недоступно';
  } else if (isInBasket) {
    buttonText = 'Удалить из корзины';
  }
 
  modal.render({
    content: cardPreview.render({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      buttonText,
      buttonDisabled: isPriceless,
    }),
  });
  modal.open();
});

events.on('basket:changed', () => {
  header.render({ counter: basketModel.getCount() });

  const basketItems = basketModel.getItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit('basket:remove', item),
    });
    return card.render({
      title: item.title,
      price: item.price,
      index: index + 1,
    });
  });

  basketView.render({
    items: basketItems,
    total: basketModel.getTotal(),
    buttonDisabled: basketModel.getCount() ===0,
  });
});

events.on('order:changed', () => {
  const buyer = orderModel.getBuyerData();
  const errors = orderModel.validateData();

  const orderErrors = [errors.payment, errors.address].filter(Boolean).join('; ');
  orderForm.render({
    payment: buyer.payment,
    address: buyer.address,
    valid: !errors.payment && !errors.address,
    errors: orderErrors,
  });

  const contactsErrors = [errors.email, errors.phone].filter(Boolean).join('; ');
  contactsForm.render({
    email: buyer.email,
    phone: buyer.phone,
    valid: !errors.email && !errors.phone,
    errors: contactsErrors,
  });
});

events.on('card:select', (item: IProduct) => {
  catalogModel.setPreviewId(item.id);
});

events.on('card:toggle', () => {
  const product = catalogModel.getPreviewProduct();
  if(!product) return;

  if (basketModel.hasProduct(product.id)) {
    basketModel.remove(product.id);
  } else {
    basketModel.add(product);
  }
  modal.close();
});

events.on('basket:open', () => {
  modal.render({
    content: basketView.render(),
  });
  modal.open();
});

events.on('basket:remove', (item: IProduct) => {
  basketModel.remove(item.id);
});

events.on('order:open', () => {
  modal.render({
    content: orderForm.render(),
  });
  modal.open();
});

events.on(
  /^(order|contacts)\..*:change$/,
  (data: { field: keyof IBuyer; value: string}) => {
    orderModel.setField(data.field, data.value);
  }
);

events.on('order:submit', () => {
  modal.render({
    content: contactsForm.render(),
  });
  modal.open();
});

events.on('contacts:submit', () => {
  const buyer = orderModel.getBuyerData();
  const orderPayload = {
    payment: buyer.payment,
    address: buyer.address,
    email: buyer.email,
    phone: buyer.phone,
    total: basketModel.getTotal(),
    items: basketModel.getItems().map((item) => item.id),
  };

  appApi
    .postOrder(orderPayload)
    .then((result) => {
      basketModel.clear();
      orderModel.clear();
      modal.render({
        content: successView.render({ total: result.total }),
      });
      modal.open();
    })
    .catch((err) => {
      console.error('Ошибка при оформлении заказа:', err);
    });
});

events.on('success:click', () =>{
  modal.close();
});

appApi
  .getProducts()
  .then((response) => {
    const items = response.items.map((item) => ({
      ...item,
      image: `${CDN_URL}${item.image}`
    }));
    catalogModel.setItems(items);
  })
  .catch((err) => {
    console.error('Ошибка при загрузке каталога товаров:', err);
  });

basketModel.clear();
orderModel.clear();

