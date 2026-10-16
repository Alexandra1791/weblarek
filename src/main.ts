import './scss/styles.scss';
import { Catalogdata } from './components/Models/CatalogData';
import { BasketData } from './components/Models/BasketData';
import { OrderData } from './components/Models/OrderData';
import { apiProducts } from './utils/data';

// Тестирование каталога

const catalog = new Catalogdata();
const basket = new BasketData();
const order = new OrderData();

catalog.setItems(apiProducts.items);
console.log ('Массив товаров из каталога:', catalog.getItems());


const product1 = apiProducts.items[0];
const product2 = apiProducts.items[1];

if (product1 && product2) {

  // Тестирование корзины

  basket.add(product1);
  console.log('Количество товаров после добавления:', basket.getCount());
  console.log('Общая стоимость корзины:', basket.getTotal());

  basket.remove(product1.id);
  console.log('Количество товаров после удаления:', basket.getCount());

  basket.clear();
  console.log('Корзина после очистки:', basket.getItems());
}

// Тестирование заказа

console.log('Валидация пустых данных покупателя:', order.validateData());

order.setField('payment', 'card');
order.setField('address', 'ул. Ленина, д. 25');
order.setField('email', 'test@example.com');
order.setField('phone', '+7 (999) 111-22-33');

console.log('Валидация полностью заполненных данных (пустой объект):', order.validateData());
console.log('Итоговые данные покупателя в модели:', order.getBuyerData());