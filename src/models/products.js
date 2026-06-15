const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones',
    price: 79.99,
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Fitness tracker with heart-rate monitor',
    price: 149.99,
  },
  {
    id: 3,
    name: 'USB-C Hub',
    description: '7-in-1 multiport adapter',
    price: 34.99,
  },
];

function findAll() {
  return [...products];
}

function findById(id) {
  return products.find((product) => product.id === id);
}

module.exports = {
  findAll,
  findById,
};
