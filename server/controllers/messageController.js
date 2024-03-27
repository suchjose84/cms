const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.addMessage = async (req, res, next) => {
    try {
      
      const maxMessageId = await sequenceGenerator.nextId("messages");
  
      const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
      });
  
      const createdMessage = await message.save();
  
      res.status(201).json({
        message: 'Message added successfully',
        document: createdMessage
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
};

module.exports.updateMessage = async (req, res, next) => {
    try {
      const message = await Message.findOne({ id: req.params.id });
  
      if (!message) {
        return res.status(404).json({
          message: 'Message not found.',
          error: { document: 'Message not found' }
        });
      }
  
      document.subject = req.body.subject;
      document.msgText = req.body.msgText;
      document.sender = req.body.sender;
  
      await Message.updateOne({ id: req.params.id }, message);
  
      res.status(204).json({
        message: 'Message updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
}

module.exports.deleteMessage = async(req, res, next) => {
    try {
      const message = await Message.findOne({ id: req.params.id });
      if(!message) {
        return res.status(404).json({
          message: 'Message not found',
          error: { message: 'Message not found' }

        });
      }

      await Message.deleteOne({ id: req.params.id });

      res.status(204).json({
        message: "Message deleted successfully"

      });
    } catch(error) {
      res.status(500).json({
        message: 'An error occured',
        error: error

      });
    }
};





