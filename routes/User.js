const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router();

router.get('/', UserController.read);
router.post('/create', UserController.create);
router.patch('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);
module.exports = router
