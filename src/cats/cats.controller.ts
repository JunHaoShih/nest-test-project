import { Body, Controller, ForbiddenException, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Res, SetMetadata, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private catService: CatsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles('admin')
    //@UsePipes(new JoiValidationPipe(createCatSchema))
    async create(@Body(/*new ValidationPipe()*/) createCatDto: CreateCatDTO/*, @Res() res: Response*/): Promise<string> {
        //return 'This action adds a new cat';
        //res.status(HttpStatus.CREATED).send('This action adds a new cat');
        this.catService.create(createCatDto);
        return 'This action adds a new cat';
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        //throw new ForbiddenException('Not allowed');
        return this.catService.findAll();
        //return of(['This action returns all cats']);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): string {
        console.log(id);
        return `This action returns a ${id} cat`;
    }
}
