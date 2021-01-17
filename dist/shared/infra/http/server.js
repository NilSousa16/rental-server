"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
/**
 * Dependência necessária para o typeorm
 * Necessário principalmente por causa do decorator
 */
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
// API que irá se comunicar com React necessida do CORS
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var routes_1 = __importDefault(require("./routes"));
var upload_1 = __importDefault(require("@config/upload"));
require("@shared/infra/typeorm");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
// import do container para injeção de dependência
require("@shared/container");
dotenv_1.default.config();
var app = express_1.default();
/** Deve ser colocado após o app
 *
 * CORS - irá evitar que sites não confiavéis acessem a aplicação (aplicações web - browsers)
 */
app.use(cors_1.default());
app.use(express_1.default.json());
// Servindo arquivo estáticos
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(routes_1.default);
// Middleware para tratativa de erros
// Deve ser colocado depois do app.use(routes);
app.use(function (err, request, response, _) {
    // Para erros conhecidos
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    // Erros inesperados
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, function () {
    console.log('Server started on port 3333!');
});
