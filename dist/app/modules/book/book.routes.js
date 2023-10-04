"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(client_1.UserRole.admin), (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.get('/:id', book_controller_1.BookController.getBookById);
router.get('/:id/category', book_controller_1.BookController.getBookByCategoryId);
router.get('/', book_controller_1.BookController.getAllBooks);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.admin), (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateSingleBook);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.admin), book_controller_1.BookController.deleteSingleBook);
exports.BookRoutes = router;