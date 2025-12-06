const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    return res.json({ ok: true, service: 'api-gateway', time: new Date() });
});

module.exports = router;