const PricingService = require('../services/pricingService');
const Pricing = require('../models/pricing');

jest.mock('../models/pricing');

describe('PricingService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculatePrice', () => {
    test('calculates price correctly for valid inputs', async () => {
      const pricingData = {
        base_distance_in_km: '5',
        km_price: '1.5',
        fix_price: '10',
      };

      Pricing.findByOrganizationAndItem.mockResolvedValue(pricingData);

      const organizationId = 1;
      const itemId = 1;
      const zone = 'central';
      const totalDistance = 12;

      const totalPrice = await PricingService.calculatePrice(
        organizationId,
        itemId,
        zone,
        totalDistance,
      );

      expect(totalPrice).toBe(20.5);
      expect(Pricing.findByOrganizationAndItem).toHaveBeenCalledWith(organizationId, itemId, zone);
    });

    test('throws error if pricing not found', async () => {
      Pricing.findByOrganizationAndItem.mockResolvedValue(null);

      const organizationId = 1;
      const itemId = 1;
      const zone = 'central';
      const totalDistance = 12;

      await expect(
        PricingService.calculatePrice(organizationId, itemId, zone, totalDistance),
      ).rejects.toThrowError('Pricing not found');
    });

    test('throws error for invalid input', async () => {
      const organizationId = 1;
      const itemId = 1;
      const zone = 'central';
      const totalDistance = 'invalid';

      await expect(
        PricingService.calculatePrice(organizationId, itemId, zone, totalDistance),
      ).rejects.toThrowError('Failed to calculate price');
    });
  });
});
