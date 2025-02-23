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
exports.CreateMahasiswaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateMahasiswaDTO {
}
exports.CreateMahasiswaDTO = CreateMahasiswaDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NIM", type: String, example: "105841114122" }),
    (0, class_validator_1.IsString)({ message: "NIM Harus Bertipe String" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tidak Boleh Kosong" }),
    (0, class_validator_1.Length)(1, 12, { message: "Hanya bisa sampai 12 karakter" }),
    __metadata("design:type", String)
], CreateMahasiswaDTO.prototype, "nim", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nama", type: String, example: "Asep Spakbor" }),
    (0, class_validator_1.IsString)({ message: "Nama Harus Bertipe String" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tidak Boleh Kosong" }),
    (0, class_validator_1.Length)(1, 50, { message: "Hanya bisa sampai 12 karakter" }),
    __metadata("design:type", String)
], CreateMahasiswaDTO.prototype, "nama", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "kelas", type: String, example: "5D" }),
    (0, class_validator_1.IsString)({ message: "Kelas Harus Bertipe String" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tidak Boleh Kosong" }),
    (0, class_validator_1.Length)(1, 2, { message: "Hanya bisa sampai 2 karakter" }),
    __metadata("design:type", String)
], CreateMahasiswaDTO.prototype, "kelas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "jurusan", type: String, example: "informatika" }),
    (0, class_validator_1.IsString)({ message: "jurusan Harus Bertipe String" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tidak Boleh Kosong" }),
    (0, class_validator_1.Length)(1, 20, { message: "Hanya bisa sampai 20 karakter" }),
    __metadata("design:type", String)
], CreateMahasiswaDTO.prototype, "jurusan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.Jenis_Kelamin,
        description: "Jenis kelamin (L/P)",
    }),
    (0, class_validator_1.IsEnum)(client_1.Jenis_Kelamin, {
        message: "Jenis Kelamin Hanya bernilai L atau P"
    }),
    __metadata("design:type", String)
], CreateMahasiswaDTO.prototype, "jenis_kelamin", void 0);
//# sourceMappingURL=create-mahasiswa.dto.js.map