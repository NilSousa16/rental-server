"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("@config/auth"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
function ensureAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing', 401);
    }
    // separa a string por espaço em um array
    // desestruturação descarta 1 posição
    var _a = authHeader.split(' '), token = _a[1];
    //verifica se um token é valido
    //usa o secret usado para criar o token
    // try catch para disparar erro no formado desejado
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        // Forçando o tipo TokenPayload para o retorno de
        // verify que não possui um tipo definido
        var sub = decoded.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Invalid JWT token', 401);
    }
}
exports.default = ensureAuthenticated;
