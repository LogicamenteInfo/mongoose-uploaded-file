# mongoose-uploaded-file

This is a mongoose SchemaType to store path of saved files.

## What it does

* Save a String contaning the path to a file saved at device disk
* Validates if the file exists before saving at database

## Installation

```bash
$ npm i -S @logicamente.info/mongoose-uploaded-file # NPM users
$ yarn add @logicamente.info/mongoose-uploaded-file # YARN users
```

## How to use

```JavaScript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Add the UploadedFile SchemaType to mongoose
require('@logicamente.info/mongoose-uploaded-file').loadType(mongoose);
const UploadedFile = mongoose.Types.UploadedFile;

// If you haven't declared the const UploadedFile
// you can use 'mongoose.Types.UploadedFile'
const ProductSchema = Schema({
  photo: { type: UploadedFile }
});

const Product = mongoose.model('Product', ProductSchema);

const p = new Product();
p.photo = '/upload/photo.jpg'
```

### Schema options

It accepts all properties from mongoose [String SchemaType](https://mongoosejs.com/docs/schematypes.html#strings).

```JavaScript
// This will transform the path into lowercase, then remove blank space
// at start and end, then validates if the file exists
var ProductSchema = Schema({
  photo: { type: UploadedFile, required: true, lowercase: true, trim: true }
});
```

## Testing

At root of this project, run `npm test`