"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_1 = __importDefault(require("./student"));
const course_1 = __importDefault(require("./course"));
const lecturer_1 = __importDefault(require("./lecturer"));
exports.default = [student_1.default, course_1.default, lecturer_1.default];
