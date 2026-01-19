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
exports.PrivateAppController = void 0;
const application_service_1 = require("./application.service");
const application_dto_1 = require("./dtos/application.dto");
const common_1 = require("@nestjs/common");
let PrivateAppController = class PrivateAppController {
    applicationService;
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    create(data) {
        return this.applicationService.create(data);
    }
    findAll() {
        return this.applicationService.findAll();
    }
    findOne(id) {
        return this.applicationService.findOne(id);
    }
    updateStatus(id, body) {
        return this.applicationService.updateApplicationStatus(id, body.statusId);
    }
};
exports.PrivateAppController = PrivateAppController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], PrivateAppController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrivateAppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PrivateAppController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PrivateAppController.prototype, "updateStatus", null);
exports.PrivateAppController = PrivateAppController = __decorate([
    (0, common_1.Controller)('ApplicationDashboard'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], PrivateAppController);
//# sourceMappingURL=dashboard.controler.js.map