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
exports.QualificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const qaualification_entity_1 = require("../../database/entities/qaualification.entity");
const typeorm_2 = require("typeorm");
let QualificationsService = class QualificationsService {
    qalRepo;
    constructor(qalRepo) {
        this.qalRepo = qalRepo;
    }
    findAll() {
        return this.qalRepo.find();
    }
    findOne(id) {
        this.qalRepo.findOneBy({ id });
    }
    create(data) {
        const qualification = this.qalRepo.create(data);
        return this.qalRepo.save(qualification);
    }
    async update(id, data) {
        await this.qalRepo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.qalRepo.delete(id);
        return { deleted: true };
    }
};
exports.QualificationsService = QualificationsService;
exports.QualificationsService = QualificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(qaualification_entity_1.Qualification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QualificationsService);
//# sourceMappingURL=qualifications.service.js.map