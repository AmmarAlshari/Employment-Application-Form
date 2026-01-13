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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const roles_decorator_1 = require("../roles/roles.decorator");
const userroles_enum_1 = require("../common/enums/userroles.enum");
const role_guard_1 = require("../roles/role.guard");
const auth_gaurd_1 = require("../auth/auth.gaurd");
let DashboardController = class DashboardController {
    createRepo;
    constructor(createRepo) {
        this.createRepo = createRepo;
    }
    signup(dto) {
        return this.createRepo.createUser(dto);
    }
    getUsers() {
        return this.createRepo.getUsers();
    }
    adminOnly() {
        return 'Admin Only ';
    }
    hrOnly() {
        return 'HR Only ';
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Post)('create/users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateDashboardUserDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_gaurd_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(userroles_enum_1.UserRoles.ADMIN),
    (0, common_1.Get)('admin-only'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "adminOnly", null);
__decorate([
    (0, common_1.UseGuards)(auth_gaurd_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(userroles_enum_1.UserRoles.HR),
    (0, common_1.Get)('hr-only'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "hrOnly", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardUsersService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map