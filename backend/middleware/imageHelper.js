let multer = require("multer");
let path = require("path");
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
}).any();

module.exports = upload;
