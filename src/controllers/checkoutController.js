const checkoutService = require('../services/checkoutService');

function checkout(req, res) {
  try {
    const result = checkoutService.checkout(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

module.exports = {
  checkout,
};
