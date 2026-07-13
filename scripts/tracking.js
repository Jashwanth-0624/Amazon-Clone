import {getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cart} from '../data/cart.js';

updateCartQ();

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  let percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  percentProgress = Math.max(10, Math.min(percentProgress, 100));
  

  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';


  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      ${deliveredMessage} ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

    const progressBar = document.querySelector('.js-progress-bar');

    // Make sure it starts at 0 every time
    progressBar.style.width = '0%';

    // Force the browser to render the 0% width
    progressBar.getBoundingClientRect();

    // Now animate to the actual progress
    setTimeout(() => {
      progressBar.style.width = `${percentProgress}%`;
    }, 50)

  updateCartQ();
  
}

loadPage();

function updateCartQ() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cartQ').innerHTML = cartQuantity;
}

