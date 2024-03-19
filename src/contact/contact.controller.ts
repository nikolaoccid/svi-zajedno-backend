import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('contact')
@ApiTags('Contact')
@ApiBearerAuth()
export class ContactController {}
