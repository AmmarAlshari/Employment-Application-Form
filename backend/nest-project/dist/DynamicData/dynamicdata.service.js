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
exports.LookupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cities_entity_1 = require("../database/entities/cities.entity");
const nationality_entity_1 = require("../database/entities/nationality.entity");
const selectedrole_entity_1 = require("../database/entities/selectedrole.entity");
const qaualification_entity_1 = require("../database/entities/qaualification.entity");
let LookupsService = class LookupsService {
    cityRepo;
    natRepo;
    roleRepo;
    qualRepo;
    constructor(cityRepo, natRepo, roleRepo, qualRepo) {
        this.cityRepo = cityRepo;
        this.natRepo = natRepo;
        this.roleRepo = roleRepo;
        this.qualRepo = qualRepo;
    }
    getCities() {
        return this.cityRepo.find();
    }
    getNationalities() {
        return this.natRepo.find();
    }
    getRoles() {
        return this.roleRepo.find();
    }
    getQualifications() {
        return this.qualRepo.find();
    }
    async createCity(data) {
        const city = this.cityRepo.create(data);
        return await this.cityRepo.save(city);
    }
};
exports.LookupsService = LookupsService;
exports.LookupsService = LookupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cities_entity_1.City)),
    __param(1, (0, typeorm_1.InjectRepository)(nationality_entity_1.Nationality)),
    __param(2, (0, typeorm_1.InjectRepository)(selectedrole_entity_1.SelectedRole)),
    __param(3, (0, typeorm_1.InjectRepository)(qaualification_entity_1.Qualification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LookupsService);
//# sourceMappingURL=dynamicdata.service.js.map