"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: Array,
        required: true
    },
});
exports.default = (0, mongoose_1.model)('Blog', schema);
