"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.thumbnail = void 0;
const multer_1 = __importDefault(require("multer"));
const thumbnailStorage = multer_1.default.diskStorage({
    destination: 'uploads/blogImage',
    filename: (req, file, res) => {
        res(null, Date.now() + "-" + file.originalname);
    },
});
const profileImageStorage = multer_1.default.diskStorage({
    destination: 'uploads/profileImage',
    filename: (req, file, res) => {
        res(null, Date.now() + "-" + file.originalname);
    },
});
const filterImage = function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"
        || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const limit = {
    // limits file size to 5 MB
    fileSize: 1024 * 1024 * 5
};
exports.thumbnail = (0, multer_1.default)({
    storage: thumbnailStorage,
    limits: limit,
    fileFilter: filterImage,
});
exports.profile = (0, multer_1.default)({
    storage: profileImageStorage,
    limits: limit,
    fileFilter: filterImage,
});
