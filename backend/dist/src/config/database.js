"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const mongoose_1 = __importDefault(require("mongoose"));
function default_1() {
    console.log(process.env.MONGOOSEURI);
    mongoose_1.default.connect(process.env.MONGOOSEURI, {}).then(() => console.log("database connected successfully")).catch(error => new Error("Database not connected"));
}
