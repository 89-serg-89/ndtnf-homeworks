import { Injectable } from '@nestjs/common'
import { Connection, Model, Query } from 'mongoose'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { CreateBooksDto } from './dto/create-books.dto'
import { Books, BooksDocument } from './schemas/books.schema'

@Injectable()
export class BooksService {
  constructor (
    @InjectModel(Books.name) private BooksModel: Model<BooksDocument>,
    @InjectConnection() private connection: Connection
  ) {  }

  findAll (): Promise<BooksDocument[]> {
    return this.BooksModel.find().exec()
  }

  create (data: CreateBooksDto): Promise<BooksDocument> {
    const book = new this.BooksModel(data)
    return book.save()
  }

  update (id: string, data: CreateBooksDto): Promise<BooksDocument> {
    return this.BooksModel.findOneAndUpdate({ _id: id }, data).exec()
  }

  delete (id: string): Promise<BooksDocument> {
    return this.BooksModel.findByIdAndDelete({ _id: id }).exec()
  }
}
