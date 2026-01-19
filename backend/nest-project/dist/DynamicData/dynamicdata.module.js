"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cities_entity_1 = require("../database/entities/cities.entity");
const nationality_entity_1 = require("../database/entities/nationality.entity");
const qaualification_entity_1 = require("../database/entities/qaualification.entity");
const selectedrole_entity_1 = require("../database/entities/selectedrole.entity");
const city_controller_1 = require("./city/city.controller");
const nationality_controller_1 = require("./nationality/nationality.controller");
const roles_controller_1 = require("./roles/roles.controller");
const qualifications_controller_1 = require("./qualifications/qualifications.controller");
const city_service_1 = require("./city/city.service");
const nationality_service_1 = require("./nationality/nationality.service");
const roles_service_1 = require("./roles/roles.service");
const qualifications_service_1 = require("./qualifications/qualifications.service");
const status_service_1 = require("./status/status.service");
const status_controller_1 = require("./status/status.controller");
const status_entity_1 = require("../database/entities/status.entity");
let DynamicDataModule = class DynamicDataModule {
};
exports.DynamicDataModule = DynamicDataModule;
exports.DynamicDataModule = DynamicDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                cities_entity_1.City,
                nationality_entity_1.Nationality,
                qaualification_entity_1.Qualification,
                selectedrole_entity_1.SelectedRole,
                status_entity_1.Status,
            ]),
        ],
        controllers: [
            city_controller_1.CityController,
            nationality_controller_1.NationalityController,
            roles_controller_1.RolesController,
            qualifications_controller_1.QualificationsController,
            status_controller_1.StatusController,
        ],
        providers: [
            city_service_1.CityService,
            nationality_service_1.NationalityService,
            roles_service_1.RolesService,
            qualifications_service_1.QualificationsService,
            status_service_1.StatusService,
        ],
    })
], DynamicDataModule);
//# sourceMappingURL=dynamicdata.module.js.map