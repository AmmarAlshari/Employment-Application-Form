"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const upload_service_1 = require("./upload.service");
const path_1 = require("path");
const pdfFileFilter = (req, file, cb) => {
    cb(null, true);
};
let UploadsController = class UploadsController {
    uploadsService;
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
    }
    async uploadCv(id, file) {
        if (!file)
            throw new common_1.BadRequestException('CV file is required');
        const resumeUrl = `/storage/cvs/${file.filename}`;
        return this.uploadsService.attachCvToApplication(+id, resumeUrl);
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)(':id/cv'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cv', {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(process.cwd(), 'storage/cvs'),
            filename: (req, file, cb) => {
                const cleanName = file.originalname
                    .toLowerCase()
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9.-]/g, '');
                const uniqueName = `${Date.now()}-${cleanName}`;
                cb(null, uniqueName);
            },
        }),
        fileFilter: pdfFileFilter,
        limits: { fileSize: 2 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadCv", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [upload_service_1.UploadsService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map