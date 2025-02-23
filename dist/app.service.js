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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("./prisma");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AppService = class AppService {
    constructor(jwtservice, prisma) {
        this.jwtservice = jwtservice;
        this.prisma = prisma;
    }
    async register(data) {
        try {
            const user = await this.prisma.user.findFirst({ where: { username: data.username } });
            if (user)
                throw new common_1.BadRequestException('Username ini Sudah Digunakan');
            const hash = (0, bcrypt_1.hashSync)(data.password, 10);
            const newUser = await this.prisma.user.create({ data: { username: data.username, password: hash } });
            return newUser;
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                throw err;
            throw new common_1.InternalServerErrorException('Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit');
        }
    }
    async auth(user_id) {
        try {
            const user = await this.prisma.user.findFirst({ where: { id: user_id } });
            if (!user)
                throw new common_1.NotFoundException('User Tidak Ditemukan');
            return user;
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                throw err;
            throw new common_1.InternalServerErrorException('Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit');
        }
    }
    async login(data) {
        try {
            const user = await this.prisma.user.findFirst({ where: { username: data.username } });
            if (!user)
                throw new common_1.NotFoundException('User Tidak Ditemukan');
            if (!(0, bcrypt_1.compareSync)(data.password, user.password))
                throw new common_1.BadRequestException('Password Salah');
            const payload = { id: user.id, username: user.username, role: user.role };
            const token = await this.jwtservice.signAsync(payload);
            return { token, user };
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                throw err;
            throw new common_1.InternalServerErrorException('Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit');
        }
    }
    getHello() {
        return 'Hello World!';
    }
    async getMahasiswa() {
        return this.prisma.mahasiswa.findMany();
    }
    async addMahasiswa(data) {
        const existing = await this.prisma.mahasiswa.findFirst({ where: { nim: data.nim } });
        if (existing)
            throw new common_1.BadRequestException('Mahasiswa dengan nim ini sudah ada');
        await this.prisma.mahasiswa.create({ data });
        return this.prisma.mahasiswa.findMany();
    }
    async getMahasiswByNim(nim) {
        const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Tidak Menemukan NIM');
        return mahasiswa;
    }
    async menghapusMahasiswa(nim) {
        const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Tidak Menemukan NIM');
        await this.prisma.mahasiswa.delete({ where: { nim } });
        return this.prisma.mahasiswa.findMany();
    }
    async updateMahasiswa(nim, data) {
        const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Tidak Menemukan NIM');
        await this.prisma.mahasiswa.update({ where: { nim }, data });
        return this.prisma.mahasiswa.findMany();
    }
    async pencarianMahasiswa(nim, nama, jurusan) {
        const mahasiswa = await this.prisma.mahasiswa.findMany({
            where: {
                nim: { contains: nim },
                nama: { contains: nama },
                jurusan: { contains: jurusan },
            },
        });
        if (mahasiswa.length === 0)
            throw new common_1.NotFoundException('Tidak Menemukan Mahasiswa');
        return mahasiswa;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_1.default])
], AppService);
//# sourceMappingURL=app.service.js.map