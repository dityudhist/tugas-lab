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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const app_service_1 = require("../app.service");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../entity/user.entity");
let AuthGuard = class AuthGuard {
    constructor(jwtService, appService) {
        this.jwtService = jwtService;
        this.appService = appService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = this.jwtService.verify(token);
            console.log('Payload decoded from token:', payload);
            const user = await this.appService.auth(payload.id);
            console.log('User from auth service:', user);
            request.user = (0, class_transformer_1.plainToInstance)(user_entity_1.User, user);
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                throw err;
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        app_service_1.AppService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map