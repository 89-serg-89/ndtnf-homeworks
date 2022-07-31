import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  Body,
  HttpStatus,
  HttpException,
  UsePipes
} from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBooksDto } from './dto/create-books.dto'
import { JoiValidationPipe } from './pipies/joi-validation.pipe'
import { booksSchema } from './joi_schemas/books.schema'

@Controller('books')
export class BooksController {
  constructor (private booksService: BooksService) {  }

  @Get()
  async findAll (@Res() res) {
    try {
      const data = await this.booksService.findAll()
      res.status(HttpStatus.OK)
      return data
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  @Post()
  async create (
    @Res() res,
    @Body(new JoiValidationPipe(booksSchema)) body: CreateBooksDto
  ) {
    try {
      const data = await this.booksService.create(body)
      res.status(HttpStatus.CREATED)
      return data
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':id')
  async update (
    @Res() res,
    @Param('id') id: string,
    @Body(new JoiValidationPipe(booksSchema)) body: CreateBooksDto
  ) {
    try {
      const data = await this.booksService.update(id, body)
      res.status(HttpStatus.OK)
      return data
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async delete (
    @Res() res,
    @Param('id') id: string
  ) {
    try {
      await this.booksService.delete(id)
      res.status(HttpStatus.OK)
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }
}
