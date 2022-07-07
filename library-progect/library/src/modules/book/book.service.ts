import { injectable } from 'inversify'
import { IBookRepository } from './book.repository'
import BookModel from '../../models/book'

@injectable()
export class BookService implements IBookRepository{
  createBook (body: object) {
    const book = new BookModel(body)
    return book.save()
  }

  getBook (id: string) {
    return BookModel.findById(id)
  }

  getBooks () {
    return BookModel.find()
  }

  updateBook (id: string, body: object) {
    return BookModel.findByIdAndUpdate(id, body)
  }

  deleteBook (id: string) {
    return BookModel.deleteOne({ _id: id })
  }
}
