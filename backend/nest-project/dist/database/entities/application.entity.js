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
exports.Application = void 0;
const typeorm_1 = require("typeorm");
const selectedrole_entity_1 = require("./selectedrole.entity");
const cities_entity_1 = require("./cities.entity");
const nationality_entity_1 = require("./nationality.entity");
let Application = class Application {
    id;
    name;
    mobile;
    email;
    gender;
    isFreshGraduate;
    qualification;
    major;
    currentPosition;
    experienceYears;
    experienceLevel;
    otherRoleRemarks;
    remarks;
    selectedRoles;
    favoriteCity;
    nationality;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 9 }),
    __metadata("design:type", String)
], Application.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Application.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Application.prototype, "isFreshGraduate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "qualification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "major", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "currentPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Application.prototype, "experienceYears", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "experienceLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "otherRoleRemarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => selectedrole_entity_1.SelectedRole),
    (0, typeorm_1.JoinTable)({
        name: 'user_selected_roles',
        joinColumn: {
            name: 'application_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'selected_role_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Application.prototype, "selectedRoles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cities_entity_1.City, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'favorite_city_id' }),
    __metadata("design:type", cities_entity_1.City)
], Application.prototype, "favoriteCity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nationality_entity_1.Nationality, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'nationality_id' }),
    __metadata("design:type", nationality_entity_1.Nationality)
], Application.prototype, "nationality", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications')
], Application);
//# sourceMappingURL=application.entity.js.map