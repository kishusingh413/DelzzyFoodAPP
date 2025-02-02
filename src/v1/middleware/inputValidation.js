const validateInput = (req, res, next) => {
  const { organization_id, item_id, zone, total_distance } = req.body;

  if (
    organization_id == undefined ||
    item_id == undefined ||
    zone == undefined ||
    total_distance == undefined
  ) {
    return res.status(400).json({ error: 'Missing required fields in request body.' });
  }

  if (typeof organization_id !== 'number' || organization_id <= 0) {
    return res.status(400).json({ error: 'Invalid organization_id value.' });
  }

  if (typeof item_id !== 'number' || item_id <= 0) {
    return res.status(400).json({ error: 'Invalid item_id value.' });
  }

  if (typeof zone !== 'string' || !['central', 'north', 'south', 'east', 'west'].includes(zone)) {
    return res
      .status(400)
      .json({
        error: 'Invalid zone value, it can be either of [central, north, south, east, west]',
      });
  }

  if (typeof total_distance !== 'number' || total_distance <= 0) {
    return res.status(400).json({ error: 'Invalid total_distance value.' });
  }

  next();
};

module.exports = { validateInput };
