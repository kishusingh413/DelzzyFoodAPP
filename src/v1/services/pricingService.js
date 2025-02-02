const Pricing = require('../models/pricing');

class PricingService {
  static async calculatePrice(organizationId, itemId, zone, totalDistance) {
    try {
      const pricing = await Pricing.findByOrganizationAndItem(organizationId, itemId, zone);

      if (!pricing) {
        throw new Error('Pricing not found for the specified organization, item, and zone.');
      }

      const { base_distance_in_km, km_price, fix_price } = pricing;
      const baseDistance = parseFloat(base_distance_in_km);
      const kmPrice = parseFloat(km_price);
      const distance = parseFloat(totalDistance);
      let totalPrice = parseFloat(fix_price);

      if (distance > baseDistance) {
        totalPrice += (distance - baseDistance) * kmPrice;
      }

      return totalPrice;
    } catch (error) {
      throw new Error(`Failed to calculate price: ${error.message}`);
    }
  }
}

module.exports = PricingService;
