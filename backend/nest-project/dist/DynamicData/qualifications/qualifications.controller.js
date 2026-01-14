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
exports.QualificationsController = void 0;
const common_1 = require("@nestjs/common");
const qualifications_service_1 = require("./qualifications.service");
const create_qual_dto_1 = require("./dto/create-qual.dto");
const update_qual_dto_1 = require("./dto/update-qual.dto");
let QualificationsController = class QualificationsController {
    qualService;
    constructor(qualService) {
        this.qualService = qualService;
    }
    getAll() {
        return this.qualService.findAll();
    }
    getOne(id) {
        return this.qualService.findOne(id);
    }
    create(data) {
        return this.qualService.create(data);
    }
    update(id, data) {
        return this.qualService.update(id, data);
    }
    remove(id) {
        return this.qualService.delete(id);
    }
};
exports.QualificationsController = QualificationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QualificationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QualificationsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_qual_dto_1.CreateQualificationDto]),
    __metadata("design:returntype", void 0)
], QualificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_qual_dto_1.UpdateQualificationDto]),
    __metadata("design:returntype", void 0)
], QualificationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QualificationsController.prototype, "remove", null);
exports.QualificationsController = QualificationsController = __decorate([
    (0, common_1.Controller)('qualifications'),
    __metadata("design:paramtypes", [qualifications_service_1.QualificationsService])
], QualificationsController);
//# sourceMappingURL=qualifications.controller.js.map