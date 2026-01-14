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
exports.NationalityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nationality_entity_1 = require("../../database/entities/nationality.entity");
const typeorm_2 = require("typeorm");
let NationalityService = class NationalityService {
    natRepo;
    constructor(natRepo) {
        this.natRepo = natRepo;
    }
    findAll() {
        return this.natRepo.find();
    }
    findOne(id) {
        this.natRepo.findOneBy({ id });
    }
    create(data) {
        const nationality = this.natRepo.create(data);
        return this.natRepo.save(nationality);
    }
    async update(id, data) {
        await this.natRepo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.natRepo.delete(id);
        return { deleted: true };
    }
};
exports.NationalityService = NationalityService;
exports.NationalityService = NationalityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nationality_entity_1.Nationality)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NationalityService);
//# sourceMappingURL=nationality.service.js.map