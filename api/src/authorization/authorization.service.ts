import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { LoginAuthorizationDto } from './dto/login-authorization.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthorizationDto: LoginAuthorizationDto) {
    const { email, password } = loginAuthorizationDto;
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user._id };
      const { password, ...userWithoutPassword } = user.toObject();
      return {
        statusCode: HttpStatus.OK,
        message: 'Has ingresado correctamente!',
        access_token: this.jwtService.sign(payload),
        user: userWithoutPassword,
      };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async create(createAuthorizationDto: CreateAuthorizationDto) {
    const { email, password, name, lastName, avatarUrl } =
      createAuthorizationDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException(
        'El usuario ya se encuentra registrado!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      name,
      lastName,
      avatarUrl,
      password: hashedPassword,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuario registrado correctamente!',
      data: newUser.save(),
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  findAll() {
    return `This action returns all authorization`;
  }

  update(id: number, _updateAuthorizationDto: UpdateAuthorizationDto) {
    return `This action updates a #${id} authorization`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorization`;
  }
}
