import { Controller, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ExportService } from './export.service';

@Controller('export')
@ApiBearerAuth()
@ApiTags('Export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('/project-users/')
  async projectUsersExport(@Res() res: Response) {
    const file: string = await this.exportService.getUsersBySchoolYears();

    res.setHeader(
      'Content-disposition',
      'attachment; filename=project-users.xlsx',
    );
    return res.download(file, 'project-users.xlsx');
  }
}
