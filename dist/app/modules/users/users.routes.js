"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(client_1.UserRole.admin), users_controller_1.UserController.getUserById);
router.get('/', (0, auth_1.default)(client_1.UserRole.admin), users_controller_1.UserController.getAllUsers);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.admin), (0, validateRequest_1.default)(users_validation_1.UserValidation.updateUserZodSchema), users_controller_1.UserController.updateSingleUser);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.admin), users_controller_1.UserController.deleteSingleUser);
exports.UserRoutes = router;
