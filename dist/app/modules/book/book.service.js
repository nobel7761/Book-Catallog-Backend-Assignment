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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constants_1 = require("./book.constants");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, category, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["search", "category", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constants_1.BookSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (category) {
        andConditions.push({
            categoryId: {
                equals: category,
            },
        });
    }
    if (minPrice !== undefined) {
        andConditions.push({ price: { gte: Number(minPrice) } });
    }
    if (maxPrice !== undefined) {
        andConditions.push({ price: { lte: Number(maxPrice) } });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        include: {
            category: true,
            reviewAndRatings: true,
        },
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { title: 'desc' },
    });
    const total = yield prisma_1.default.book.count();
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: { id },
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Doesn't Exists");
    }
    return result;
});
const getBookByCategoryId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id,
        },
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Doesn't Exists");
    }
    return result;
});
const updateSingleBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Doesn't Exists");
    }
    const result = yield prisma_1.default.book.update({
        where: { id },
        data,
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    return result;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Doesn't Exists");
    }
    const result = yield prisma_1.default.book.delete({
        where: { id },
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBookById,
    getBookByCategoryId,
    updateSingleBook,
    deleteSingleBook,
};
