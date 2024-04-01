import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateUserRequestDto } from './create-user-request.dto';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  @IsNotEmpty()
  id: number;
}
