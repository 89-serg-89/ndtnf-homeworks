import { Injectable } from '@nestjs/common'
import { BooksInterface } from './interfaces/books.interface'
import { CreateBooksDto } from './dto/create-books.dto'

@Injectable()
export class BooksService {
  private readonly books: BooksInterface[] = []

  findAll (): BooksInterface[] {
    return this.books
  }

  create (data: CreateBooksDto): void {
    this.books.push(data)
  }
}
