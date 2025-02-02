const pool = require('../config/database');

class Organization {
  static async findById(id) {
    const query = 'SELECT * FROM organizations WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Organization;
