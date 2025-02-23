import { AppService } from './app.service';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from './entity/user.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    register(user: RegisterUserDTO): Promise<{
        username: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
        foto_profile: string | null;
    }>;
    login(data: LoginUserDTO): Promise<{
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
    getMahasiswaByNim(nim: string): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }>;
    auth(user: User): User;
    createMahasiswa(data: CreateMahasiswaDTO): Promise<{
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
    deleteMahasiswa(nim: string): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
    searchMahasiswa(nim: string, nama: string, jurusan: string): Promise<{
        nim: string;
        nama: string;
        kelas: string;
        jurusan: string;
        jenis_kelamin: import(".prisma/client").$Enums.Jenis_Kelamin;
        foto_profile: string | null;
    }[]>;
}
