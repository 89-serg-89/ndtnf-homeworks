import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBooksDto } from './dto/create-books.dto'
import { BooksInterface } from './interfaces/books.interface'

@Controller('books')
export class BooksController {
  constructor (private booksService: BooksService) {  }

  @Get()
  findAll (@Res() res): BooksInterface[] {
    const data = this.booksService.findAll()
    return res.status(HttpStatus.OK).json({
      data,
      status: 'ok'
    })
  }

  @Post()
  create (@Res() res, @Body() body: CreateBooksDto) {
    this.booksService.create(body)
    return res.status(HttpStatus.OK).json({
      status: 'ok'
    })
  }
}
