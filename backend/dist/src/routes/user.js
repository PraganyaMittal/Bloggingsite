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
const express_1 = require("express");
const user_1 = __importDefault(require("../model/user"));
const multer_1 = require("../config/multer");
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/register', multer_1.profile.single('pic'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.file) {
            res.status(413).json(`File not uploaded!, Please 
                            attach jpeg file under 5 MB`);
            return;
        }
        const userFound = yield user_1.default.findOne({ email: req.body.email });
        if (userFound) {
            throw new Error("User already exist");
        }
        const newUser = new user_1.default({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            title: req.body.title,
            description: req.body.description,
            profileImage: req.file.path
        });
        yield newUser.save();
        res.status(200).json(`User register successfully`);
    }
    catch (error) {
        if (error instanceof Error) {
            if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)
                fs_1.default.unlinkSync((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
            res.status(500).json(error.message);
        }
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
        const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
        if (!email || !password)
            throw new Error("Please fill all the fields");
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({
                message: 'Email not found',
                success: false
            });
            return;
        }
        const check = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!check) {
            res.status(401).json({
                message: 'Invalid email or password',
                success: false
            });
            return;
        }
        const loggedInUser = yield user_1.default.aggregate([
            { $match: { _id: user._id } },
            { $project: { password: 0 } }
        ]);
        const token = AssignCookie(loggedInUser[0]._id, loggedInUser[0].email, process.env.PRIVATE_KEY);
        res.json({
            message: "Logined successfully",
            data: Object.assign(Object.assign({}, loggedInUser[0]), { token: token })
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Something went wrong",
                success: "false"
            });
        }
    }
}));
router.post("/validate", (req, res) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.auth_token;
        if (!token)
            throw new Error();
        res.status(200).json({
            validated: true,
        });
    }
    catch (error) {
        res.status(401).json({
            validated: false,
        });
    }
});
router.post('/get', (req, res) => {
    res.cookie('auth', '').send("hello");
});
router.get('/authors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({});
        const AllUsers = yield user_1.default.aggregate([
            { $match: {} },
            { $project: { password: 0 } }
        ]);
        return res.json({
            data: AllUsers,
        });
    }
    catch (_a) {
    }
}));
function AssignCookie(userId, email, privateKey) {
    const jwt = jsonwebtoken_1.default;
    const data = {
        email: email,
        userId: userId
    };
    const token = jwt.sign(data, privateKey);
    return token;
}
exports.default = router;
