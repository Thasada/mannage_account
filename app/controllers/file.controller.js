const uploadFile = require("../middlewares/upload");
const uploadController = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({
        message: "Not found the upload file.",
      });
    }
    res.status(200).send({
      message: `Uploaded file successfully: ${req.file.filename}`,
      uploadFileName: req.file.filename,
    });
  } catch (err) {
    res.status(500).send({
      message: `Couldn't upload the file: ${err} `,
    });
  }
};

const displayAvatar = (req, res) => {
  const filename = req.params.name;
  const directoryPath = __basedir + "/assets/";
  res.download(directoryPath + filename, filename, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not display the file." + err,
      });
    }
  });
};
module.exports = { uploadController, displayAvatar };
