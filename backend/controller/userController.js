const User = require("../services/userServices");

module.exports.addUser = async (req, res) => {
    const result = await User.addUser(req);
    res.json(result);
};

module.exports.login = async (req, res) => {

    console.log("login:------->>",req);
    const result = await User.login(req.body);
    res.json(result);
};

module.exports.allUserList = async (req, res) => {
    const result = await User.allUserList(req.user, req.query);
    res.json(result);
};

module.exports.allUserList1 = async (req, res) => {
    const result = await User.allUserList1();
    res.json(result);
};
module.exports.userVerifyByAdmin = async (req, res) => {
    const result = await User.userVerifyByAdmin(req.body);
    res.json(result);
};
module.exports.userDetails = async (req, res) => {
    const result = await User.userDetails(req.params);
    res.json(result);
};
module.exports.updateUser = async (req, res) => {
    const result = await User.updateUser(req);
    res.json(result);
};
module.exports.deleteUser = async (req, res) => {
    const result = await User.deleteUser(req.params);
    res.json(result);
};
module.exports.verifyUsersList = async (req, res) => {
    const result = await User.verifyUsersList(req.user, req.query);
    res.json(result);
};
module.exports.userImage = async (req, res) => {
    const result = await User.userImage(req.files[0], req.user);
    res.json(result);
};

module.exports.userByToken = async (req, res) => {
    const result = await User.userByToken(req.user)
    res.json(result)
};

module.exports.userVerifyBySuperVisor = async (req, res) => {
    const result = await User.userVerifyBySuperVisor(req.body, req.params)
    res.json(result)
};

module.exports.statusUpdate = async (req, res) => {
    const result = await User.statusUpdate(req.body, req.params);
    res.json(result);
};