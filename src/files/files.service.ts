import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './interfaces/file.interface';
import { v4 as uuid } from 'uuid';
import * as aws from "aws-sdk";
import { S3 } from "aws-sdk";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel('File') private readonly FileModel: Model<File>) {}

  async uploadFile(dataBuffer: Buffer, fileName: string): Promise<File> {
    try {
      const spacesEndpoint = new aws.Endpoint( process.env.AWS_REGION,);

      const s3 = new S3({
        endpoint: spacesEndpoint,
        secretAccessKey:  process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
      });
  
      const uploadResult = await s3.upload({
        Bucket:  process.env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${fileName}`,
        ACL: "public-read",
      }).promise();
      
      console.log("Upload results =========>", uploadResult)

      const fileToStore = {
        fileName: fileName,
        fileUrl: uploadResult.Location,
        key: uploadResult.Key,
      }
  
      const fileStored = new this.FileModel(fileToStore)
      return await fileStored.save()
    } catch (error) {
      console.log("Error in upload file servce")
      console.log(error)
      return null
    }
  
  }
}

