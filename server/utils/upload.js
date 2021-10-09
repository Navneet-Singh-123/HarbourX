const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const config = require("config");
const db = config.get("mongoURL");
const storage = new GridFsStorage({
  url: db,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    // const match = ["image/png", "image/jpeg"];

    // if (match.indexOf(file.mimetype) === -1) {
    //   const filename = `${new Date().getTime()}-${file.originalname}`;
    //   return filename;
    // }

    return {
      bucketName: "media",
      filename: `${new Date().getTime()}-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
