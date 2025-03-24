import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { UsersContractRepository } from 'src/shared/database/repositories/usersContract.repositories';
import { AccessLevel } from './entities/AccessLevel';
import { UserLogService } from '../user-log/user-log.service';
import { getCurrentISOString } from 'src/shared/utils/getCurrentISOString';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersRigRepo: UsersRigRepository,
    private readonly jwtService: JwtService,
    private readonly rigsRepo: RigsRepository,
    private readonly usersContractRepo: UsersContractRepository,
    private readonly userLogService: UserLogService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password, loginTime } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuário inativo!');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    await this.userLogService.create(loginTime, user.id);

    const accessToken = await this.generateAccessToken(
      user.id,
      user.accessLevel as AccessLevel,
    );

    return { accessToken };
  }

  async signup(signUpDto: SignupDto) {
    const { name, email, password, accessLevel, rigId, contractId } = signUpDto;

    const isEmailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new ConflictException('Email já cadastrado!');
    }

    if (rigId) {
      const rigExists = await this.rigsRepo.findUnique({
        where: { id: rigId },
      });

      if (!rigExists) {
        throw new ConflictException('Sonda não encontrada!');
      }
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        accessLevel,
        password: hashedPassword,
      },
    });

    if (contractId) {
      await this.usersContractRepo.create({
        data: {
          userId: user.id,
          contractId,
        },
      });
    }

    if (rigId) {
      await this.usersRigRepo.create({
        data: {
          userId: user.id,
          rigId,
        },
      });
    }

    const accessToken = await this.generateAccessToken(
      user.id,
      user.accessLevel as AccessLevel,
    );

    return {
      accessToken,
    };
  }

  async authenticateWithoutPassword(userId: string) {
    const user = await this.usersRepo.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    // Gerar um token de acesso diretamente
    const accessToken = await this.generateAccessToken(
      user.id,
      user.accessLevel as AccessLevel,
    );

    return { accessToken };
  }

  private async generateAccessToken(
    userId: string,
    userAccessLevel: AccessLevel,
  ) {
    return await this.jwtService.signAsync({
      sub: userId,
      role: userAccessLevel,
    });
  }
}
