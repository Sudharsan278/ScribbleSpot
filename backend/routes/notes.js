const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    onam = {
        coutry : 'India',
        state : 'Kerala'
    };
    res.json(onam);
});

module.exports = router;