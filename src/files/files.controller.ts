import { Controller, Body, Param, UploadedFile, UseInterceptors, Get, Post, } from "@nestjs/common";
import { Express } from 'express'
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from './files.service';
// import { CreateFileDto } from './dto/create-file-dto';
import { File } from './interfaces/file.interface';

@Controller('/v1/api/fileUpload')
export class FilesController {
  constructor(private readonly FilesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    console.log('File to upload ====>', file);
    
    try {
      const uploadedFile = await this.FilesService.uploadFile(file.buffer, file.originalname);
      
      if(uploadedFile){
        console.log('File has been uploaded,', uploadedFile.fileName);
        return uploadedFile       
      }else{
        return null       
      }
    } catch (error) {
      console.log("Error inside upload file controller")
      console.log(error)
      return null       
    }
  }
}