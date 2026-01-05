// uploads.controller.ts
import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadsService } from './upload.service';

const pdfFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  cb(null, true);
};

@Controller('applications')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post(':id/cv')
  @UseInterceptors(
    FileInterceptor('cv', {
      storage: diskStorage({
        destination: 'storage/cvs',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: pdfFileFilter,
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async uploadCv(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('CV file is required');

    // This becomes: /storage/cvs/xxxx.pdf
    const resumeUrl = `/storage/cvs/${file.filename}`;

    return this.uploadsService.attachCvToApplication(+id, resumeUrl);
  }
}


