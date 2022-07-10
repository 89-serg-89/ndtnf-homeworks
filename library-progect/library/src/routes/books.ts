import { Router } from 'express'
const router = Router()
import axios from 'axios'
import fileMiddleware from '../middleware/file'

const url_api_books = process.env.ORIGIN + ':' + process.env.PORT + '/api/books/'
const COUNTER_ORIGIN = process.env.COUNTER_ORIGIN || 'localhost:3001'

router.get('/create', (req, res) => {
  try {
    res.render('books/create', {
      title: 'Добавить книгу',
      route: 'create',
      book: {}
    })
  } catch (e: any) {
    console.log(`Error: ${e}`)
    res.status(404).redirect('/404')
  }
})

router.post(
  '/create',
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
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }
      await axios.post(url_api_books, {
        fileCover: files?.fileCover?.[0].filename,
        ...req.body
      })
      res.redirect('/books')
    } catch (e: any) {
      console.log(`Error: ${e}`)
      res.status(404).redirect('/404')
    }
  })

router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await axios.get(url_api_books + id)
    const book = response.data
    if (!book) res.status(404).redirect('/404')
    res.render('books/edit', {
      title: `Редактирование ${book.title}`,
      route: 'edit',
      book
    })
  } catch (e) {
    console.log(`Error: ${e}`)
    res.status(404).redirect('/404')
  }
})

router.post(
  '/edit/:id',
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
    const id = req.params.id
    if (!id) res.status(404).redirect('/404')
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    await axios.put(url_api_books + id, {
      fileCover: files?.fileCover?.[0].filename,
      ...req.body
    })
    res.redirect('/books')
  } catch (e) {
    console.log(`Error: ${e}`)
    res.status(404).redirect('/404')
  }
})

router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) res.status(404).redirect('/404')
    await axios.delete(url_api_books + id)
    res.redirect('/books')
  } catch (e: any) {
    console.log(`Error: ${e}`)
    res.status(404).redirect('/404')
  }
})

router.get('/', async (req, res) => {
  try {
    console.log('get')
    console.log(url_api_books)
    const response = await axios.get(url_api_books)
    console.log(response)
    const books = response.data
    res.render('books/index', {
      title: 'Список книг',
      books
    })
  } catch (e: any) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await axios.get(url_api_books + id)
    const book = response.data
    const countVisible = await axios.post(`http://${COUNTER_ORIGIN}/counter/${id}/incr`)
    if (!book) res.status(404).redirect('/404')
    res.render('books/view', {
      title: book.title,
      book,
      countVisible: countVisible?.data?.count
    })
  } catch (e: any) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

export = router
