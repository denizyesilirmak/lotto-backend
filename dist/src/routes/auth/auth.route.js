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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var email_1 = require("../../helpers/email");
var otp_model_1 = __importDefault(require("../../models/otp/otp.model"));
var user_model_1 = __importDefault(require("../../models/user/user.model"));
var router = (0, express_1.Router)();
exports.authRouter = router;
router.post("/register/email", function (req, res) {
    //name validation
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            message: "Name is required.",
        });
    }
    //lastName validation
    if (!req.body.lastname) {
        return res.status(400).json({
            success: false,
            message: "Last name is required.",
        });
    }
    //email validation
    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            message: "Email is required.",
        });
    }
    //email format validation
    var emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            success: false,
            message: "Email format is invalid.",
        });
    }
    //phoneNumber validation
    if (!req.body.phoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required.",
        });
    }
    //phoneNumber format validation
    var phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(req.body.phoneNumber)) {
        return res.status(400).json({
            success: false,
            message: "Phone number format is invalid.",
        });
    }
    //cityId validation
    if (!req.body.cityId) {
        return res.status(400).json({
            success: false,
            message: "City is required.",
        });
    }
    //birthDate validation
    if (!req.body.birthDate) {
        return res.status(400).json({
            success: false,
            message: "Birth date is required.",
        });
    }
    (0, email_1.sendActivationEmail)(req.body.email, req.body.name, req.body.lastname).then(function (data) {
        console.log(data);
        res.json({
            success: true,
            data: req.body,
            message: "Activation email sent. User can now verify his email.",
        });
    });
});
router.post("/register/email/otp", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var emailRegex, otp, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //email validation
                if (!req.body.email) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Email is required.",
                        })];
                }
                emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(req.body.email)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Email format is invalid.",
                        })];
                }
                //otp validation
                if (!req.body.otp) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "OTP is required.",
                        })];
                }
                return [4 /*yield*/, otp_model_1.default.find({ email: req.body.email })];
            case 1:
                otp = _a.sent();
                console.log("anan", anan);
                user = new user_model_1.default({
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    cityId: req.body.cityId,
                    birthDate: req.body.birthDate,
                });
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Internal server error.",
                        });
                    }
                    res.json({
                        success: true,
                        data: user,
                        message: "User created.",
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
