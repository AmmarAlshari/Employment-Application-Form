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
exports.NationalityController = void 0;
const common_1 = require("@nestjs/common");
const nationality_service_1 = require("./nationality.service");
const create_nationalty_dto_1 = require("./dto/create-nationalty.dto");
const update_nationality_dto_1 = require("./dto/update-nationality.dto");
let NationalityController = class NationalityController {
    natService;
    constructor(natService) {
        this.natService = natService;
    }
    getAll() {
        return this.natService.findAll();
    }
    getOne(id) {
        return this.natService.findOne(id);
    }
    create(data) {
        return this.natService.create(data);
    }
    update(id, data) {
        return this.natService.update(id, data);
    }
    remove(id) {
        return this.natService.delete(id);
    }
};
exports.NationalityController = NationalityController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NationalityController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NationalityController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nationalty_dto_1.CreateNationalityDto]),
    __metadata("design:returntype", void 0)
], NationalityController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_nationality_dto_1.UpdateNationalityDto]),
    __metadata("design:returntype", void 0)
], NationalityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NationalityController.prototype, "remove", null);
exports.NationalityController = NationalityController = __decorate([
    (0, common_1.Controller)('nationalities'),
    __metadata("design:paramtypes", [nationality_service_1.NationalityService])
], NationalityController);
//# sourceMappingURL=nationality.controller.js.map