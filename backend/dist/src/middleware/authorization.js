"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../model/user"));
const Auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("working");
    try {
        const token = req.cookies.auth_token;
        if (!token)
            throw new Error("You need to Login");
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.PRIVATE_KEY);
        const user = decoded.userid;
        console.log(user);
        const data = yield user_1.default.findById(user);
        if (data._id) {
            next();
        }
        else {
            throw new Error("Token expired");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({
                message: error.message,
                success: false,
            });
        }
    }
});
exports.Auth = Auth;
