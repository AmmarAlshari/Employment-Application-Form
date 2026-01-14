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
exports.LookupsController = void 0;
const common_1 = require("@nestjs/common");
const dynamicdata_service_1 = require("./dynamicdata.service");
const createCity_dto_1 = require("./dto/createCity.dto");
let LookupsController = class LookupsController {
    LookupsService;
    constructor(LookupsService) {
        this.LookupsService = LookupsService;
    }
    getCities() {
        return this.LookupsService.getCities();
    }
    getNationalities() {
        return this.LookupsService.getNationalities();
    }
    getRoles() {
        return this.LookupsService.getRoles();
    }
    getQualifications() {
        return this.LookupsService.getQualifications();
    }
    createCity(dto) {
        return this.LookupsService.createCity(dto);
    }
};
exports.LookupsController = LookupsController;
__decorate([
    (0, common_1.Get)('cities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getCities", null);
__decorate([
    (0, common_1.Get)('nationalities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getNationalities", null);
__decorate([
    (0, common_1.Get)('selected-roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('qualifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "getQualifications", null);
__decorate([
    (0, common_1.Post)('cities/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCity_dto_1.CreateCityDto]),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "createCity", null);
exports.LookupsController = LookupsController = __decorate([
    (0, common_1.Controller)('lookups'),
    __metadata("design:paramtypes", [dynamicdata_service_1.LookupsService])
], LookupsController);
//# sourceMappingURL=dynamicdata.controler.js.map