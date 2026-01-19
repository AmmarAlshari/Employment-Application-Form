"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const application_service_1 = require("./application.service");
const public_controller_1 = require("./public.controller");
const dashboard_controler_1 = require("./dashboard.controler");
const application_entity_1 = require("../database/entities/application.entity");
const nationality_entity_1 = require("../database/entities/nationality.entity");
const qaualification_entity_1 = require("../database/entities/qaualification.entity");
const selectedrole_entity_1 = require("../database/entities/selectedrole.entity");
const status_entity_1 = require("../database/entities/status.entity");
const cities_entity_1 = require("../database/entities/cities.entity");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                application_entity_1.Application,
                nationality_entity_1.Nationality,
                qaualification_entity_1.Qualification,
                selectedrole_entity_1.SelectedRole,
                status_entity_1.Status,
                cities_entity_1.City,
            ]),
        ],
        controllers: [public_controller_1.PublicAppController, dashboard_controler_1.PrivateAppController],
        providers: [application_service_1.ApplicationService],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map