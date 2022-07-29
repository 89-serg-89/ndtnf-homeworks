import { Controller, Get, Post, Put, Delete, Res, Param, Body, HttpStatus, HttpException } from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBooksDto } from './dto/create-books.dto'

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
    @Body() body: CreateBooksDto
  ) {
    try {
      const data = await this.booksService.create(body)
      return res.status(HttpStatus.CREATED).json({
        status: 'ok',
        data
      })
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: e.message
      })
    }
  }

  @Put(':id')
  async update (
    @Res() res,
    @Param('id') id: string,
    @Body() body: CreateBooksDto
  ) {
    try {
      const data = await this.booksService.update(id, body)
      return res.status(HttpStatus.OK).json({
        status: 'ok',
        data
      })
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: e.message
      })
    }
  }

  @Delete(':id')
  async delete (
    @Res() res,
    @Param('id') id: string
  ) {
    try {
      await this.booksService.delete(id)
      return res.status(HttpStatus.OK).json({
        status: 'ok'
      })
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: e.message
      })
    }
  }
}
