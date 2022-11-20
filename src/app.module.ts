import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ FilesModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGOURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
