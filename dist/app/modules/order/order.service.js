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
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (id, role, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== client_1.UserRole.customer) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const { orderedBooks } = data;
    const result = yield prisma_1.default.order.create({
        data: {
            userId: id,
            orderedBooks: {
                create: orderedBooks.map((item) => ({
                    bookId: item.bookId,
                    quantity: item.quantity,
                })),
            },
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getAllOrders = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === client_1.UserRole.admin) {
        result = yield prisma_1.default.order.findMany({});
        return result;
    }
    if (role === client_1.UserRole.customer) {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: id,
            },
        });
        return result;
    }
});
const getSingleOrder = (userId, role, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === client_1.UserRole.admin) {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
            },
        });
        return result;
    }
    if (role === client_1.UserRole.customer) {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
                userId,
            },
        });
        if (!result)
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
        return result;
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
