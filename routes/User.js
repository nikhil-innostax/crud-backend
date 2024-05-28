const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router();

router.get('/', UserController.read);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);
module.exports = router
