const express = require("express");
const router = express.Router();

// get users
router.get('/', (req, res) => {

  const { limit, offset } = req.query;

  if(limit && offset) {
    res.json({
      limit,
      offset,
    });
  }else{
    res.send('There is no params');
  }
});

module.exports = router;
