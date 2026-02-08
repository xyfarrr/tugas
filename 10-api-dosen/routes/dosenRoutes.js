const express = require('express');
const router = express.Router();
const dosenController = require('../controllers/dosenControllers');

router.get('/dosen', dosenController.getAllDosen);           // GET all
router.get('/dosen/:nidn', dosenController.getDosenById);    // GET by ID
router.post('/dosen', dosenController.tambahDosen);          // POST
router.put('/dosen/:nidn', dosenController.updateDosen);     // PUT
router.delete('/dosen/:nidn', dosenController.deleteDosen);  // DELETE

module.exports = router;