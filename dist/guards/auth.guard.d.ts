import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../app.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly appService;
    constructor(jwtService: JwtService, appService: AppService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
