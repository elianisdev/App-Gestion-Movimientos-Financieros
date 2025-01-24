import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://elianis:elianis2025@cluster0.bbalm.mongodb.net/financial?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
