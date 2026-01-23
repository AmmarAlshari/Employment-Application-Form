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
import { UploadsService } from './upload.service';
import { join } from 'path';

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
        destination: join(process.cwd(), 'storage/cvs'),
        filename: (req, file, cb) => {
          const cleanName = file.originalname
            .toLowerCase()
            .toLowerCase()
            .replace(/\s+/g, '-') // spaces → dashes
            .replace(/[^a-z0-9.-]/g, ''); // remove ', ", %, etc
          const uniqueName = `${Date.now()}-${cleanName}`;

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

    const resumeUrl = `/storage/cvs/${file.filename}`;

    return this.uploadsService.attachCvToApplication(+id, resumeUrl);
  }
}
