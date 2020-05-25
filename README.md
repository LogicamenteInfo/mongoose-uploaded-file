# mongoose-uploaded-file

SchemaType específico para armazenar caminhos de arquivos salvos no disco.

## O que isto faz

* Salva uma String contendo o caminho de um arquivo salvo no disco do dispositivo rodando esta biblioteca
* Valida se o arquivo existe antes de salvar banco

## Como usar

```JavaScript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Adicione o tipo UploadedFile ao Mongoose
require('mongoose-uploaded-file').loadType(mongoose);
const UploadedFile = mongoose.Types.UploadedFile;

// Se você não tiver declarado a constante UploadedFile
// você poderá utilizar 'mongoose.Types.UploadedFile'
const ProdutoSchema = Schema({
  foto: { type: UploadedFile }
});

const Produto = mongoose.model('Produto', ProdutoSchema);

const produto = new Produto();
produto.foto = '/upload/foto.jpg'
```

### Schema options

Aceita todas propriedades do [esquema de opções de string](https://mongoosejs.com/docs/schematypes.html#strings) do mongoose.

```JavaScript
// Irá transformar o valor para minúsculo, remover espaços em branco
// antes e depois da string, e validar se o arquivo existe no disco
var ProdutoSchema = Schema({
  foto: { type: UploadedFile, required: true, lowercase: true, trim: true }
});
```

## Testando

Na raiz do diretório do projeto, execute `npm test`