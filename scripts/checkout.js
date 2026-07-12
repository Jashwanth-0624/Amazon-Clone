import {renderOrderSumm} from './checkout/orderSumm.js';
import {renderPaymentSumm} from './checkout/paymentSumm.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js'
// import '../data/backend-practice.js';
//import '../data/cart-class.js';

async function loadPage(){
  try{

    //throw 'error1';
    
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error1';
      loadCart(() => {
        //reject('error3')
        resolve('value3');
      });
    });
  } catch(error){
    console.log('Unexpected error. Please try again later');
  }
  

  renderOrderSumm();
  renderPaymentSumm();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    })

]).then((values) => {
  console.log(values)
  renderOrderSumm();
  renderPaymentSumm();
});
*/

/*
new Promise((resolve) => {
      loadProducts(() => {
        resolve('value');
      });
    })
.then((value) =>{
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSumm();
  renderPaymentSumm();
});*/

/*
loadProducts(() => {
  renderOrderSumm();
  renderPaymentSumm();
});*/
