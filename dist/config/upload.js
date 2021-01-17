"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Utilizado para configuração de caminhos pelo nodejs
var path_1 = __importDefault(require("path"));
// Configurações de upload
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var tmpFolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    // Para acessar o caminho em outros arquivos
    tmpFolder: tmpFolder,
    uploadsFolder: path_1.default.resolve(tmpFolder, 'uploads'),
    // Armazenamento em disco local
    storage: multer_1.default.diskStorage({
        //__dirname - caminho completo até o arquivo em uso
        destination: tmpFolder,
        // nome que o arquivo vai receber
        filename: function (request, file, callback) {
            var fileHash = crypto_1.default.randomBytes(10).toString('hex');
            var fileName = fileHash + "-" + file.originalname;
            //Necessário no multer
            return callback(null, fileName);
        }
    }),
};
