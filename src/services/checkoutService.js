const productModel = require('../models/products');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.1;

function checkout({ items, paymentMethod }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw { status: 400, message: 'Items array is required and must not be empty' };
  }

  if (!paymentMethod || !VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    throw {
      status: 400,
      message: 'Payment method must be "cash" or "credit_card"',
    };
  }

  const lineItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = productModel.findById(item.productId);

    if (!product) {
      throw { status: 404, message: `Product with id ${item.productId} not found` };
    }

    if (!item.quantity || item.quantity < 1) {
      throw { status: 400, message: 'Each item must have a quantity of at least 1' };
    }

    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;

    lineItems.push({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal: roundCurrency(lineTotal),
    });
  }

  const discount =
    paymentMethod === 'cash' ? roundCurrency(subtotal * CASH_DISCOUNT_RATE) : 0;
  const total = roundCurrency(subtotal - discount);

  return {
    items: lineItems,
    paymentMethod,
    subtotal: roundCurrency(subtotal),
    discount,
    total,
  };
}

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

module.exports = {
  checkout,
};
