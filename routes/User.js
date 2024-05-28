const express = require('express')
const UserController = require('../controllers/User')
const router = express.Router();
router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.post('/create', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);
module.exports = router