const Parcel = require("../services/parcelService");

module.exports.addParcel = async (req, res) => {
    const result = await Parcel.addParcel(req.body, req.user);
    res.json(result);
};

module.exports.dateByParcel = async (req, res) => {
    const result = await Parcel.dateByParcel(req.query, req.user);
    res.json(result);
};

module.exports.parcelList = async (req, res) => {
    const result = await Parcel.parcelList(req.user, req.query);
    res.json(result);
};

module.exports.parcelAllot = async (req, res) => {
    const result = await Parcel.parcelAllot(req.body, req.user);
    res.json(result);
};

module.exports.deliveryBoyParcel = async (req, res) => {
    const result = await Parcel.deliveryBoyParcel(req.query, req.user);
    res.json(result);
};

module.exports.detailsAllotedPrcel = async (req, res) => {
    const result = await Parcel.detailsAllotedPrcel(req.params, req.user);
    res.json(result);
};

module.exports.updateAllotedParcel = async (req, res) => {
    const result = await Parcel.updateAllotedParcel(req.body, req.params, req.user);
    res.json(result);
};

module.exports.parcelAllotList = async (req, res) => {
    const result = await Parcel.parcelAllotList(req.query, req.user);
    res.json(result);
};
module.exports.updateParcel = async (req, res) => {

    const result = await Parcel.updateParcel(req.body, req.params);
    res.json(result);
};