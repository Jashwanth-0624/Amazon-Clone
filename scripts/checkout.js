import {renderOrderSumm} from './checkout/orderSumm.js';
import {renderPaymentSumm} from './checkout/paymentSumm.js';
import {loadProducts} from '../data/products.js';
// import '../data/backend-practice.js';
//import '../data/cart-class.js';

loadProducts(() => {
  renderOrderSumm();
  renderPaymentSumm();
});
