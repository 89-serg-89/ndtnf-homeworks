export abstract class IBookRepository {
  createBook (body: object) {}

  getBook (id: string) {}

  getBooks () {}

  updateBook (id: string, body: object) {}

  deleteBook (id: string) {}
}
