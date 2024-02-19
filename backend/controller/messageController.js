const Message = require("../services/messageService");

module.exports.addMessage = async(req, res) => {
    const result = await Message.addMessage(req.body);
    res.json(result);
};
module.exports.messageDetails = async(req, res) => {
    const result = await Message.messageDetails(req.params);
    res.json(result);
};
module.exports.deleteMessage = async(req, res) => {
    const result = await Message.deleteMessage(req.params);
    res.json(result);
};
module.exports.allMessageList = async(req, res) => {
    const result = await Message.allMessageList(req.user, req.query);
    res.json(result);
};
module.exports.myMessageList = async(req, res) => {
    const result = await Message.myMessageList(req.user, req.query);
    res.json(result);
};