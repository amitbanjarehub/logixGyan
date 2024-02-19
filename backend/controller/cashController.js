const Cash = require("../services/cashDepositService");

module.exports.addCash = async (req, res) => {
    const result = await Cash.addCash(req);
    res.json(result);
};

module.exports.cashList = async (req, res) => {
    const result = await Cash.cashList(req.query, req.user);
    res.json(result);
};


module.exports.updateCash = async (req, res) => {
    const result = await Cash.updateCash(req);
    res.json(result);
};