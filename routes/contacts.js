const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyAccessToken } = require('../middleware/verifyAuth');
const { contactValidator } = require('../validators/validators');

router.use(verifyAccessToken);

router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContact);
router.post('/', (req, res, next) => {
  const error = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error });
  next();
}, contactController.createContact);
router.put('/:id', (req, res, next) => {
  const error = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error });
  next();
}, contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
