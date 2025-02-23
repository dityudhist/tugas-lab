import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import PrismaService from './prisma';
import { RegisterUserDTO } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private readonly jwtservice;
    private readonly prisma;
    constructor(jwtservice: JwtService, prisma: PrismaService);
    register(data: RegisterUserDTO): Promise<{
        username: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
        foto_profile: string | null;
    }>;
    auth(user_id: number): Promise<{
        username: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
        foto_profile: string | null;
    }>;
    login(data: RegisterUserDTO): Promise<{
        token: string;
        user: {
            username: string;
            password: string;
            id: number;
            role: import(".prisma/client").$Enums.Role;
            foto_profile: string | null;
        };
    }>;
    getHello(): string;
    getMahasiswa(): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
    addMahasiswa(data: CreateMahasiswaDTO): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
    getMahasiswByNim(nim: string): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }>;
    menghapusMahasiswa(nim: string): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
    updateMahasiswa(nim: string, data: CreateMahasiswaDTO): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
    pencarianMahasiswa(nim: string, nama: string, jurusan: string): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
}
