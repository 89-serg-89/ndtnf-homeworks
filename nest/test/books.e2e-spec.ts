import 'dotenv/config'
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { BooksModule } from '../src/books/books.module'
import { BooksService } from '../src/books/books.service'

describe('BooksController', () => {
  let app: INestApplication
  let booksService = {
    findAll: () => [{
      id: '62ed1ffc91e8eb901830b94d',
      title: 'jest test book',
      description: 'description'
    }],
    create: () => ({
      title: 'jest test book',
      description: 'description'
    }),
    update: () => ({
      title: 'jest test book',
      description: 'description'
    }),
    delete: jest.fn()
  }

  beforeEach (async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        BooksModule
      ]
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it ('Get /books', async () => {
    try {
      return request(app.getHttpServer())
        .get('/api/books')
        .expect(200)
        .expect(booksService.findAll())
    } catch (e) {
      console.log(e)
    }
  })

  it ('Post /books', () => {
    try {
      return request(app.getHttpServer())
        .post('/api/books')
        .send(booksService.create())
        .expect(201)
        .expect(booksService.create())
    } catch (e) {
      console.log(e)
    }
  })

  it ('Put /books', () => {
    try {
      return request(app.getHttpServer())
        .put('/api/books/62ed1ffc91e8eb901830b94d')
        .send(booksService.update())
        .expect(200)
        .expect(booksService.update())
    } catch (e) {
      console.log(e)
    }
  })

  it ('Delete /books', () => {
    try {
      return request(app.getHttpServer())
        .delete('/api/books/62ed1ffc91e8eb901830b94d')
        .expect(200)
    } catch (e) {
      console.log(e)
    }
  })

  afterAll (async () => {
    // await mongoose.connection.close()
    await app.close()
  })
})
