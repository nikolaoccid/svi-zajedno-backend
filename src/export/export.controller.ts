import { Controller, Get, Res, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { ExportService } from './export.service';

@Controller('export')
@ApiBearerAuth()
@ApiTags('Export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('/project-users/')
  async projectUsersExport(
    @AuthenticatedUser() user: User,
    @Res() res: Response,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }

    const file: string = await this.exportService.getUsersBySchoolYears();

    res.setHeader(
      'Content-disposition',
      'attachment; filename=project-users.xlsx',
    );
    return res.download(file, 'project-users.xlsx');
  }
}
