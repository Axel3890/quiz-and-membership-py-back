import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscripcionDto } from './create-subscripcion.dto';

export class UpdateSubscripcionDto extends PartialType(CreateSubscripcionDto) {}
