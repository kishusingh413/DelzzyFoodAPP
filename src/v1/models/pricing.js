const pool = require('../config/database');

class Pricing {
  static async findByOrganizationAndItem(organizationId, itemId, zone) {
    const query =
      'SELECT * FROM pricings WHERE organization_id = $1 AND item_id = $2 AND zone = $3';
    const values = [organizationId, itemId, zone];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Pricing;
