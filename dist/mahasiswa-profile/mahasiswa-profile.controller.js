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
exports.MahasiswaProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const mahasiswa_profile_service_1 = require("./mahasiswa-profile.service");
const fs_1 = require("fs");
const path_1 = require("path");
let MahasiswaProfileController = class MahasiswaProfileController {
    constructor(mahasiswaProfileService) {
        this.mahasiswaProfileService = mahasiswaProfileService;
    }
    async uploadFile(file, nim) {
        console.log('Received NIM:', nim);
        if (!file) {
            throw new common_1.BadRequestException('File tidak boleh kosong!');
        }
        if (!nim) {
            throw new common_1.BadRequestException('NIM tidak boleh kosong!');
        }
        return this.mahasiswaProfileService.uploadFile(file, nim);
    }
    async getProfile(nim, res) {
        const filename = await this.mahasiswaProfileService.sendMyFotoProfile(nim);
        if (!filename) {
            throw new common_1.NotFoundException('Foto profil tidak ditemukan!');
        }
        const filePath = (0, path_1.join)(process.cwd(), 'uploads', filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.NotFoundException('File tidak ditemukan di server');
        }
        return res.sendFile(filePath);
    }
};
exports.MahasiswaProfileController = MahasiswaProfileController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload foto profil mahasiswa' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
                nim: { type: 'string' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('nim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MahasiswaProfileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':nim'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil foto profil mahasiswa berdasarkan NIM' }),
    __param(0, (0, common_1.Param)('nim')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MahasiswaProfileController.prototype, "getProfile", null);
exports.MahasiswaProfileController = MahasiswaProfileController = __decorate([
    (0, swagger_1.ApiTags)('Mahasiswa Profile'),
    (0, common_1.Controller)('mahasiswa-profile'),
    __metadata("design:paramtypes", [mahasiswa_profile_service_1.MahasiswaProfileService])
], MahasiswaProfileController);
//# sourceMappingURL=mahasiswa-profile.controller.js.map