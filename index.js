const mongoose = require("mongoose");
const util = require("util");
const fs = require("fs");

module.exports.loadType = function (mongoose) {
  mongoose.Types.UploadedFile = mongoose.SchemaTypes.UploadedFile = UploadedFile;
  return UploadedFile;
};

function UploadedFile(path, options) {
  mongoose.SchemaTypes.String.call(this, path, options);
  this.validators.push({
    validator: (path) => fs.existsSync(`./${path}`) || fs.existsSync(path),
    message: (props) => `Não existe arquivo no local informado para ${props.path}: '${props.value}'`
  });
}

util.inherits(UploadedFile, mongoose.SchemaTypes.String);