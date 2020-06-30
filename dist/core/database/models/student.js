'use strict';
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('students', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        first_name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        matriculation_number: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING(200),
            allowNull: true,
            unique: true
        },
        profile_image: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        department: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        admin_level: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {});
    Student.associate = function (models) {
        Student.belongsToMany(models.courses, {
            through: 'course_students',
            as: 'courses',
            foreign_key: 'studentId',
        });
    };
    Student.beforeCreate((student) => __awaiter(void 0, void 0, void 0, function* () {
        student.password = yield student.generatePasswordHash();
    }));
    Student.prototype.generatePasswordHash = function () {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 12;
            return yield bcryptjs_1.default.hash(this.password, saltRounds);
        });
    };
    Student.prototype.validatePassword = function (password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, this.password);
        });
    };
    return Student;
};
