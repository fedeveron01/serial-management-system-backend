const express = require('express');
const router = express.Router();
const serialController = require('../controllers/serialController');

router.get('/', serialController.getSerials);
router.post('/', serialController.createSerial);        
router.put('/:code', serialController.updateSerial);
router.delete('/:code', serialController.deleteSerial);
router.post('/activateSerial/:code', serialController.activateSerial);


module.exports = router;