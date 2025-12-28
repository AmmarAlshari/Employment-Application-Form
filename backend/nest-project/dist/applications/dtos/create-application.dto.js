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
exports.CreateApplicationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const englishlevel_enum_1 = require("../../common/enums/englishlevel.enum");
const gender_enum_1 = require("../../common/enums/gender.enum");
class CreateApplicationDto {
    name;
    nationalId;
    mobile;
    email;
    gender;
    nationalityId;
    favoriteCityId;
    selectedRoleIds;
    experienceLevel;
    isFreshGraduate;
    qualificationId;
    major;
    currentPosition;
    experienceYears;
    otherRoleRemarks;
    remarks;
}
exports.CreateApplicationDto = CreateApplicationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(10, 10),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "nationalId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(9, 9),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "mobile", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateApplicationDto.prototype, "nationalityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateApplicationDto.prototype, "favoriteCityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreateApplicationDto.prototype, "selectedRoleIds", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(englishlevel_enum_1.EnglishLevel),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true' || value === 'Yes'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateApplicationDto.prototype, "isFreshGraduate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateApplicationDto.prototype, "qualificationId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "major", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "currentPosition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateApplicationDto.prototype, "experienceYears", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "otherRoleRemarks", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "remarks", void 0);
//# sourceMappingURL=create-application.dto.js.map