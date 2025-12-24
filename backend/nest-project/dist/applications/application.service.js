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
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("../database/entities/application.entity");
const cities_entity_1 = require("../database/entities/cities.entity");
const nationality_entity_1 = require("../database/entities/nationality.entity");
const selectedrole_entity_1 = require("../database/entities/selectedrole.entity");
let ApplicationService = class ApplicationService {
    repo;
    cityRepo;
    natRepo;
    roleRepo;
    constructor(repo, cityRepo, natRepo, roleRepo) {
        this.repo = repo;
        this.cityRepo = cityRepo;
        this.natRepo = natRepo;
        this.roleRepo = roleRepo;
    }
    async create(data) {
        console.log('Creating application with data:', data);
        const application = this.repo.create({
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            gender: data.gender,
            experienceLevel: data.experienceLevel,
            isFreshGraduate: data.isFreshGraduate ?? false,
            qualification: data.qualification,
            major: data.major,
            currentPosition: data.currentPosition,
            experienceYears: data.experienceYears,
            otherRoleRemarks: data.otherRoleRemarks,
            remarks: data.remarks,
        });
        const nationality = await this.natRepo.findOneBy({ id: data.nationalityId });
        if (!nationality) {
            throw new common_1.NotFoundException(`Nationality with id ${data.nationalityId} not found`);
        }
        application.nationality = nationality;
        if (data.favoriteCityId) {
            const city = await this.cityRepo.findOneBy({ id: data.favoriteCityId });
            if (!city) {
                throw new common_1.NotFoundException(`City with id ${data.favoriteCityId} not found`);
            }
            application.favoriteCity = city;
        }
        if (Array.isArray(data.selectedRoleIds) && data.selectedRoleIds.length > 0) {
            const roles = await this.roleRepo.findBy({ id: (0, typeorm_2.In)(data.selectedRoleIds) });
            if (roles.length !== data.selectedRoleIds.length) {
                throw new common_1.NotFoundException(`One or more selected roles not found`);
            }
            application.selectedRoles = roles;
        }
        else {
            application.selectedRoles = [];
        }
        return this.repo.save(application);
    }
    findAll() {
        return this.repo.find({
            relations: ['favoriteCity', 'nationality', 'selectedRoles'],
        });
    }
    async findOne(id) {
        const data = await this.repo.findOne({
            where: { id },
            relations: ['favoriteCity', 'nationality', 'selectedRoles'],
        });
        if (!data) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        return data;
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(cities_entity_1.City)),
    __param(2, (0, typeorm_1.InjectRepository)(nationality_entity_1.Nationality)),
    __param(3, (0, typeorm_1.InjectRepository)(selectedrole_entity_1.SelectedRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationService);
//# sourceMappingURL=application.service.js.map