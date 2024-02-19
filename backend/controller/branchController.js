const Branch = require("../services/branchService");

module.exports.addBranch = async (req, res) => {
    const result = await Branch.addBranch(req.body);
    res.json(result);
};

module.exports.branchList = async (req, res) => {
    const result = await Branch.branchList(req.user, req.query);
    res.json(result);
};
module.exports.branchDetails = async (req, res) => {
    const result = await Branch.branchDetails(req.params);
    res.json(result);
};
module.exports.updateBranch = async (req, res) => {
    const result = await Branch.updateBranch(req.body, req.params);
    res.json(result);
};
module.exports.addBranchExpences = async (req, res) => {

    const result = await Branch.addBranchExpences(req);
    res.json(result);
};
module.exports.getExpencesList = async (req, res) => {
    const result = await Branch.getExpencesList(req.user, req.query);
    res.json(result);
};


module.exports.updateExpenses = async (req, res) => {
    const result = await Branch.updateExpenses(req);
    res.json(result);
};

module.exports.deleteExpences = async (req, res) => {
    const result = await Branch.deleteExpences(req.params);
    res.json(result);
};