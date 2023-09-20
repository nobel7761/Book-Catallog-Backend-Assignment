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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const id = (_a = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _a === void 0 ? void 0 : _a.id;
    const role = (_b = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _b === void 0 ? void 0 : _b.role;
    const result = yield order_service_1.OrderService.createOrder(id, role, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const id = (_c = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _c === void 0 ? void 0 : _c.id;
    const role = (_d = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _d === void 0 ? void 0 : _d.role;
    const result = yield order_service_1.OrderService.getAllOrders(id, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const userId = (_e = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _e === void 0 ? void 0 : _e.id;
    const role = (_f = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _f === void 0 ? void 0 : _f.role;
    const orderId = req.params.id;
    const result = yield order_service_1.OrderService.getSingleOrder(userId, role, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
