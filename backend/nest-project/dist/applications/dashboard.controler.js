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
const roles_decorator_1 = require("../roles/roles.decorator");
const application_service_1 = require("./application.service");
const common_1 = require("@nestjs/common");
const userroles_enum_1 = require("../common/enums/userroles.enum");
const auth_gaurd_1 = require("../auth/auth.gaurd");
const role_guard_1 = require("../roles/role.guard");
let PrivateAppController = class PrivateAppController {
    applicationService;
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    findAll() {
        return this.applicationService.findAll();
    }
    updateApplicationStatus(id, body) {
        return this.applicationService.updateApplicationStatus(id, body.statusId);
    }
    deleteApplication(id) {
        return this.applicationService.deleteApplicationByStatus(id);
    }
    assignApplication(id, body) {
        return this.applicationService.assign(id, body.assignedUserId);
    }
};
exports.PrivateAppController = PrivateAppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrivateAppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PrivateAppController.prototype, "updateApplicationStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PrivateAppController.prototype, "deleteApplication", null);
__decorate([
    (0, common_1.Put)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PrivateAppController.prototype, "assignApplication", null);
exports.PrivateAppController = PrivateAppController = __decorate([
    (0, roles_decorator_1.Roles)(userroles_enum_1.UserRoles.ADMIN, userroles_enum_1.UserRoles.HR),
    (0, common_1.UseGuards)(auth_gaurd_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('ApplicationDashboard'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], PrivateAppController);
//# sourceMappingURL=dashboard.controler.js.map