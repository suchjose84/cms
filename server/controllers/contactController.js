const Contact = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');

module.exports.getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().populate('group');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getContactById = async (req, res, next) => {
  try {
      const contactId = req.params.id;
      const contact = await Contact.findById(contactId).populate('group');

      // Check if contact exists
      if (!contact) {
          return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(200).json(contact);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


module.exports.addContact = async (req, res, next) => {
    try {
      const maxContactId = await sequenceGenerator.nextId("contacts");
  
      const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group

      });
  
      const createdContact = await contact.save();
  
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
};

module.exports.updateContact = async (req, res, next) => {
    try {
      const contact = await Contact.findOne({ id: req.params.id });
  
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found' }
        });
      }
      contact.id = req.body.id;
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;
  
      await Contact.updateOne({ id: req.params.id }, contact);
  
      res.status(204).json({
        message: 'Contact updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
}

module.exports.deleteContact = async(req, res, next) => {
    try {
      const contact = await Contact.findOne({ id: req.params.id });
      if(!contact) {
        return res.status(404).json({
          message: 'Contact not found',
          error: { contact: 'Contact not found' }

        });
      }

      await Contact.deleteOne({ id: req.params.id });

      res.status(204).json({
        message: "Contact deleted successfully"

      });
    } catch(error) {
      res.status(500).json({
        message: 'An error occured',
        error: error

      });
    }
};





