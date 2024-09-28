import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscripcionService } from './subscripcion.service';
import { CreateSubscripcionDto } from './dto/create-subscripcion.dto';
import { UpdateSubscripcionDto } from './dto/update-subscripcion.dto';

@Controller('subscripcion')
export class SubscripcionController {
  constructor(private readonly subscripcionService: SubscripcionService) {}

  @Post()
  create(@Body() createSubscripcionDto: CreateSubscripcionDto) {
    return this.subscripcionService.create(createSubscripcionDto);
  }

  @Get()
  findAll() {
    return this.subscripcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscripcionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscripcionDto: UpdateSubscripcionDto) {
    return this.subscripcionService.update(+id, updateSubscripcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscripcionService.remove(+id);
  }
}
