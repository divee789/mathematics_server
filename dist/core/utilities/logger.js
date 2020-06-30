"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)),
    transports: [
        new winston_1.default.transports.File({
            filename: 'app.log',
            level: 'info',
            silent: process.env.NODE_ENV === 'test',
        }),
        new winston_1.default.transports.Console({
            level: 'debug',
            handleExceptions: true,
        }),
    ],
});
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.default = logger;
