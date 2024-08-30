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
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
const fs_1 = __importDefault(require("fs"));
const blog_1 = __importDefault(require("../model/Blog"));
const authorization_1 = require("../middleware/authorization");
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield blog_1.default.find({});
        if (!response) {
            throw new Error("Error while fetching from Database");
        }
        return res.json({
            success: true,
            data: response
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.json({
                success: true,
                message: error.message
            });
        }
    }
}));
router.post('/create', multer_1.thumbnail.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(413).send({
                message: `File not uploaded!, Please 
                            attach jpeg file under 5 MB`
            });
            return;
        }
        if (!req.body.title || !req.body.paragraph || !req.body.userId) {
            fs_1.default.unlinkSync(req.file.path);
            res.status(500).send({
                message: "Something went wrong"
            });
            return;
        }
        const blog = new blog_1.default({
            title: req.body.title,
            paragraph: req.body.paragraph,
            userId: req.body.userId,
            imagePath: req.file.path
        });
        yield blog.save();
        // successfull completion
        res.status(201).send({
            message: "Blog uploaded successfully"
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Something went wrong"
        });
    }
}));
router.post('/update', authorization_1.Auth, multer_1.thumbnail.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.file) {
        //     res.status(413).send({
        //         message: `File not uploaded!, Please 
        //                     attach jpeg file under 5 MB`
        //     });
        //     return;
        // }
        if (!req.body.title || !req.body.paragraph || !req.body.userId || !req.body.blogId) {
            // fs.unlinkSync(req.file.path);
            res.status(500).send({
                message: "Something went wrong"
            });
            return;
        }
        const blog_id = req.body.blog_id;
        yield blog_1.default.findOneAndUpdate({ _id: blog_id }, {
            title: req.body.title,
            paragraph: req.body.paragraph
        }, { new: true });
        // successfull completion
        res.status(201).send({
            message: "Blog Updated successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Something went wrong",
        });
    }
}));
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userId;
        const response = yield blog_1.default.find({ userId });
        if (!response) {
            throw new Error("Error while fetching from Database");
        }
        return res.json({
            success: true,
            data: response
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.json({
                success: true,
                message: error.message
            });
        }
    }
}));
exports.default = router;
