"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const application_module_1 = require("./applications/application.module");
const dynamicdata_module_1 = require("./dynamicdata/dynamicdata.module");
const upload_module_1 = require("./uploads/upload.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            application_module_1.ApplicationModule,
            dynamicdata_module_1.DynamicDataModule,
            upload_module_1.UploadsModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardUserModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map