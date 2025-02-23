import { Injectable, BadRequestException, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import PrismaService from './prisma';
import { RegisterUserDTO } from './dto/register-user.dto';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtservice: JwtService, private readonly prisma: PrismaService) {}

  async register(data: RegisterUserDTO) {
    try {
      const user = await this.prisma.user.findFirst({ where: { username: data.username } });
      if (user) throw new BadRequestException('Username ini Sudah Digunakan');

      const hash = hashSync(data.password, 10);
      const newUser = await this.prisma.user.create({ data: { username: data.username, password: hash } });
      return newUser;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit');
    }
  }

  async auth(user_id: number) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: user_id } });
      if (!user) throw new NotFoundException('User Tidak Ditemukan');
      return user;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit');
    }
  }

  async login(data: RegisterUserDTO) {
    try {
      const user = await this.prisma.user.findFirst({ where: { username: data.username } });
      if (!user) throw new NotFoundException('User Tidak Ditemukan');
      if (!compareSync(data.password, user.password)) throw new BadRequestException('Password Salah');

      const payload = { id: user.id, username: user.username, role: user.role };
      const token = await this.jwtservice.signAsync(payload);
      return { token, user };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getMahasiswa() {
    return this.prisma.mahasiswa.findMany();
  }

  async addMahasiswa(data: CreateMahasiswaDTO) {
    const existing = await this.prisma.mahasiswa.findFirst({ where: { nim: data.nim } });
    if (existing) throw new BadRequestException('Mahasiswa dengan nim ini sudah ada');

    await this.prisma.mahasiswa.create({ data });
    return this.prisma.mahasiswa.findMany();
  }

  async getMahasiswByNim(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
    if (!mahasiswa) throw new NotFoundException('Tidak Menemukan NIM');
    return mahasiswa;
  }

  async menghapusMahasiswa(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
    if (!mahasiswa) throw new NotFoundException('Tidak Menemukan NIM');

    await this.prisma.mahasiswa.delete({ where: { nim } });
    return this.prisma.mahasiswa.findMany();
  }

  async updateMahasiswa(nim: string, data: CreateMahasiswaDTO) {
    const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
    if (!mahasiswa) throw new NotFoundException('Tidak Menemukan NIM');

    await this.prisma.mahasiswa.update({ where: { nim }, data });
    return this.prisma.mahasiswa.findMany();
  }

  async pencarianMahasiswa(nim: string, nama: string, jurusan: string) {
    const mahasiswa = await this.prisma.mahasiswa.findMany({
      where: {
        nim: { contains: nim },
        nama: { contains: nama },
        jurusan: { contains: jurusan },
      },
    });

    if (mahasiswa.length === 0) throw new NotFoundException('Tidak Menemukan Mahasiswa');
    return mahasiswa;
  }
}
