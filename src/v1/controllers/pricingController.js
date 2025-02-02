const PricingService = require('../services/pricingService');

async function calculatePrice(req, res, next) {
  const { organization_id, item_id, zone, total_distance } = req.body;

  try {
    const totalPrice = await PricingService.calculatePrice(
      organization_id,
      item_id,
      zone,
      total_distance,
    );

    res.json({ total_price: totalPrice });
  } catch (error) {
    next(error);
  }
}

module.exports = { calculatePrice };
