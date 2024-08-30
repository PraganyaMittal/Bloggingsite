"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_js_1 = __importDefault(require("./blog.js"));
const user_js_1 = __importDefault(require("./user.js"));
const MainRouter = (0, express_1.Router)();
MainRouter.use('/blog', blog_js_1.default);
MainRouter.use('/user', user_js_1.default);
exports.default = MainRouter;
