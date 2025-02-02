const pool = require('../config/database');

class Item {
  static async findById(id) {
    const query = 'SELECT * FROM items WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Item;
