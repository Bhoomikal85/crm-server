const Contact = require('../models/contact');

exports.createContact = async (req, res, next) => {
  try {
    const c = new Contact({ ...req.body, owner: req.user.id });
    c.activities.push({ action: 'created', by: req.user.id, note: 'Contact created' });
    await c.save();
    res.status(201).json(c);
  } catch (err) { next(err); }
};

exports.getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, status } = req.query;
    const filter = { owner: req.user.id };
    if (q) filter.$or = [{ name: new RegExp(q,'i') }, { email: new RegExp(q,'i') }];
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Contact.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter)
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
};

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, owner: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.json(contact);
  } catch (err) { next(err); }
};

exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, owner: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Not found' });

    Object.assign(contact, req.body);
    contact.activities.push({ action: 'updated', by: req.user.id, note: 'Contact updated' });
    await contact.save();
    res.json(contact);
  } catch (err) { next(err); }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Not found' });
    // You could record deletion in a separate log collection; here we add a final activity (not persistable after delete)
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
