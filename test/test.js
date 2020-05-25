const should = require("should");
const mongoose = require("mongoose");
const UploadedFile = require("../index.js").loadType(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  photo: { type: UploadedFile },
});
const Product = mongoose.model("Product", ProductSchema);

describe("UploadedFile Type", function () {
  describe("the returned object from requiring uploaded-file", function () {
    it("should have a loadType method", function () {
      const module = require("../index.js");
      module.should.have.ownProperty("loadType");
      module.loadType.should.be.a.Function;
    });
  });

  describe("mongoose.Schema.Types.UploadedFile", function () {
    before(function () {
      const module = require("../index.js").loadType(mongoose);
    });
    it("mongoose.Schema.Types should have a type called UploadedFile", function () {
      mongoose.Schema.Types.should.have.ownProperty("UploadedFile");
    });
    it("mongoose.Types should have a type called UploadedFile", function () {
      mongoose.Types.should.have.ownProperty("UploadedFile");
    });
    it("should be a function", function () {
      mongoose.Schema.Types.UploadedFile.should.be.a.Function;
    });
    it("should have a validator", function () {
      new mongoose.Schema.Types.UploadedFile('Test', {}).validators.should.be.a.Array;
    });
  });

  describe("setting a photo and saving the record", function () {
    before(function () {
      mongoose.connect("mongodb://localhost/mongoose_currency_test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
    after(function () {
      mongoose.connection.db.dropDatabase();
      mongoose.connection.close();
    });
    it("should be saved", function (done) {
      const product = new Product({ photo: "/demo/file.txt" });
      product.save(function (err, new_product) {
        new_product.should.have.property('photo', '/demo/file.txt');
        should.not.exist(err);
        done();
      });
    });
    it("should not be saved", function (done) {
      const product = new Product({ photo: "/demo/does_not_exists.jpg" });
      product.save(function (err, new_product) {
        err.toString().should.equal("ValidationError: photo: Não existe arquivo no local informado para photo: '/demo/does_not_exists.jpg'");
        done();
      });
    });
  });
});
