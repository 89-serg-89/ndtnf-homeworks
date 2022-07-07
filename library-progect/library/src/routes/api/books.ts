import path from 'path'
import { Router } from 'express'
// @ts-ignore
import fileMiddleware from '../../middleware/file'
import { BookService } from '../../modules/book/book.service'
import { container } from '../../configs/inversity.config'
const router = Router()

router.get('/', async (req, res) => {
  try {
    const bookService = container.get(BookService)
    const data = await bookService.getBooks()
    res.json(data)
  } catch (e: any) {
    throw new Error(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const bookService = container.get(BookService)
    const book = await bookService.getBook(req.params.id)
    if (!book) {
      res.status(404)
      res.json('book not found')
      return
    }
    res.json(book)
  } catch (e: any) {
    throw new Error(e)
  }
})

router.post(
  '/',
  fileMiddleware.fields([
    {
      name: 'fileCover', maxCount: 1
    },
    {
      name: 'fileBook', maxCount: 1
    }
  ]),
  async (req, res) => {
    try {
      let { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
      if (!fileCover && req?.file?.filename) fileCover = req?.file?.filename
      const bookService = container.get(BookService)
      const result = await bookService.createBook({title, description, authors, favorite, fileCover, fileName, fileBook})
      if (!result) {
        res.status(404)
        res.json('Error')
        return
      }
      res.json(result)
    } catch (e: any) {
      throw new Error(e)
    }
  })

router.put(
  '/:id',
  fileMiddleware.fields([
    {
      name: 'fileCover', maxCount: 1
    },
    {
      name: 'fileBook', maxCount: 1
    }
  ]),
  async (req, res) => {
    try {
      const data = req.body
      if (!data.fileCover && req?.file?.filename) data.fileCover = req?.file?.filename
      data.favorite = !!data.favorite
      const bookService = container.get(BookService)
      const result = await bookService.updateBook(req.params.id, data)
      if (!result) {
        res.status(404)
        res.json('Error')
        return
      }
      res.json('success')
    } catch (e: any) {
      throw new Error(e)
    }
  })

router.delete('/:id', async (req, res) => {
  try {
    const bookService = container.get(BookService)
    const result = await bookService.deleteBook(req.params.id)
    if (result?.deletedCount < 1) {
      res.status(404)
      res.json('book not found')
      return
    }
    res.json('ok')
  } catch (e: any) {
    throw new Error(e)
  }
})

router.get('/:id/download', async (req, res) => {
  try {
    const bookService = container.get(BookService)
    const book = await bookService.getBook(req.params.id)
    if (!book) res.status(404).json('Book not found')
    const pathDir = path.join(__dirname, '..', 'public', 'books', 'files', book.fileBook)
    res.download(pathDir, book.fileBook, err => {
      res.status(404).end()
    })
  } catch (e: any) {
    throw new Error(e)
  }
})

module.exports = router
