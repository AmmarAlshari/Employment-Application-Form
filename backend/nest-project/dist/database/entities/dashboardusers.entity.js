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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardUser = void 0;
const userroles_enum_1 = require("../../common/enums/userroles.enum");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./application.entity");
let DashBoardUser = class DashBoardUser {
    id;
    email;
    password;
    role;
    createdAt;
    updateAt;
    assignedApplications;
};
exports.DashBoardUser = DashBoardUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DashBoardUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)({ unique: true }),
    __metadata("design:type", String)
], DashBoardUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_2.Column)({}),
    __metadata("design:type", String)
], DashBoardUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: 'enum', enum: userroles_enum_1.UserRoles }),
    __metadata("design:type", String)
], DashBoardUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DashBoardUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DashBoardUser.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.Application, app => app.assignedBy),
    __metadata("design:type", Array)
], DashBoardUser.prototype, "assignedApplications", void 0);
exports.DashBoardUser = DashBoardUser = __decorate([
    (0, typeorm_1.Entity)('dashboard_users')
], DashBoardUser);
//# sourceMappingURL=dashboardusers.entity.js.map