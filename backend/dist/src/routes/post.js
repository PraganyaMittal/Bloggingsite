"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
const fs_1 = __importDefault(require("fs"));
router.post('/create', multer_1.default.single('image'), (req, res) => {
    try {
        if (!req.file) {
            res.status(413).send(`File not uploaded!, Please 
                            attach jpeg file under 5 MB`);
            return;
        }
        if (!req.body.title || !req.body.paragraph || !req.body.userId) {
            fs_1.default.unlinkSync(req.file.path);
            return res.status(500).send("Something went wrong");
        }
        // successfull completion
        res.status(201).send("Files uploaded successfully");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});
exports.default = router;
