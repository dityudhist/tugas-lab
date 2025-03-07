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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_1 = require("./prisma");
const jwt_1 = require("@nestjs/jwt");
const profile_module_1 = require("./profile/profile.module");
const mahasiswa_profile_module_1 = require("./mahasiswa-profile/mahasiswa-profile.module");
const chat_module_1 = require("./chat/chat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: "sdfsghttyu45etgerte4r34fe",
            }),
            profile_module_1.ProfileModule,
            mahasiswa_profile_module_1.MahasiswaProfileModule,
            chat_module_1.ChatModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_1.default],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map