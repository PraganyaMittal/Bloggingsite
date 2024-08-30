"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const master_js_1 = __importDefault(require("./src/routes/master.js"));
const dotenv = __importStar(require("dotenv"));
const database_js_1 = __importDefault(require("./src/config/database.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv.config();
app.use((0, cors_1.default)({
    origin: '*',
    // origin : ["http://localhost:3000", process.env.FRONTEND_URL!],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use('/uploads', express_1.default.static('./uploads'));
app.use((0, cookie_parser_1.default)());
(0, database_js_1.default)();
app.use(express_1.default.json({
    limit: '20mb',
}));
app.get('/', (req, res) => {
    console.log('client hit /');
    res.send('working fine');
});
app.use(master_js_1.default);
app.listen(process.env.PORT, () => { console.log("running on 4000"); });
