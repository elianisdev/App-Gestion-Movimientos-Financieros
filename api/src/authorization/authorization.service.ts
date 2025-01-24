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
      return {
        statusCode: HttpStatus.OK,
        message: 'User authenticated successfully',
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }

  async create(createAuthorizationDto: CreateAuthorizationDto) {
    const { email, password, name, lastName, avatarUrl } =
      createAuthorizationDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
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
      message: 'User created successfully',
      data: newUser.save(),
    };
  }

  findAll() {
    return `This action returns all authorization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorization`;
  }

  update(id: number, updateAuthorizationDto: UpdateAuthorizationDto) {
    return `This action updates a #${id} authorization`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorization`;
  }
}
