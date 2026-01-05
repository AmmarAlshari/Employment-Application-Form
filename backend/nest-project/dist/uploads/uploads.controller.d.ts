import { UploadsService } from './upload.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadCv(id: string, file?: Express.Multer.File): Promise<{
        message: string;
        applicationId: number;
        resumeUrl: string;
    }>;
}
