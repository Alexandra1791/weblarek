import './scss/styles.scss';
import { Catalogdata } from './components/Models/CatalogData';
import { BasketData } from './components/Models/BasketData';
import { OrderData } from './components/Models/OrderData';
import { Api } from './components/base/Api';
import { AppApi } from './components/AppApi';
import { API_URL } from './utils/constants';

const baseApi = new Api(API_URL);
const appApi = new AppApi(baseApi);

const catalog = new Catalogdata();
const basket = new BasketData();
const order = new OrderData();

appApi.getProducts()
  .then((res)=> {
    catalog.setItems(res.items);
    console.log('Массив товаров из каталога:', catalog.getItems());

    const testProductId = res.items[0]?.id;
    if (testProductId) {
      console.log(`Поиск товара по ID "${testProductId}":`, catalog.getProduct(testProductId))
    }
    console.log('Поиск несуществующего товара(должен быть null):', catalog.getProduct('fake-id'));
    console.log('Превью до установки (должно быть null):', catalog.getPreviewId());

    if (testProductId) {
      catalog.setPreviewId(testProductId);
      console.log('Установленный ID в превью:', catalog.getPreviewId());
      console.log('Полученный объект товаров для превью:', catalog.getPreviewProduct());
    }

    const product1 = catalog.getItems()[0];
    const product2 = catalog.getItems()[1];

    if (product1&&product2) {
      basket.add(product1);
      console.log('Количество товаров после добавления:', basket.getCount());
      console.log('Общая стоимость корзины:', basket.getTotal());

      console.log(`Товар "${product1.title}" в корзине? (ожидается true):`, basket.hasProduct(product1.id));
      console.log('Несуществующий товар в корзине? (ожидается false):',basket.hasProduct('fake-id'));

      basket.remove(product1.id);
      console.log('Количество товаров после удаления:', basket.getCount());

      basket.clear();
      console.log('Корзина после очистки:', basket.getItems());
    }
  })

  .catch((err) => {
    console.error('Ошибка при загрузке данных с сервера:', err);
  });



console.log('Валидация пустых данных покупателя:', order.validateData());

order.setField('payment', 'card');
order.setField('address', 'ул. Ленина, д. 25');
order.setField('email', 'test@example.com');
order.setField('phone', '+7 (999) 111-22-33');

console.log('Валидация полностью заполненных данных (пустой объект):', order.validateData());
console.log('Итоговые данные покупателя в модели:', order.getBuyerData());