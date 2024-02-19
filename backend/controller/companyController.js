const Company = require("../services/companyService");

module.exports.addCompany = async(req, res) => {
    const result = await Company.addCompany(req.body);
    res.json(result);
};

module.exports.companyList = async(req, res) => {
    const result = await Company.companyList(req.user, req.query);
    res.json(result);
};

module.exports.companyDetails = async(req, res) => {
    const result = await Company.companyDetails(req.params);
    res.json(result);
};
module.exports.updateCompany = async(req, res) => {
    const result = await Company.updateCompany(req.body, req.params);
    res.json(result);
};