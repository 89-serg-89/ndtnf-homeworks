import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { BooksModule } from './books.module'
import { BooksService } from './books.service'

describe('BooksController', () => {
  let app: INestApplication
  let booksService = {
    findAll: () => [{
      id: '62ed1ffc91e8eb901830b94d',
      title: 'jest test book',
      description: 'description'
    }]
  }

  beforeAll (async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BooksModule
      ]
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it ('Get /books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect({
        data: booksService.findAll()
      })

    afterAll(async () => {
      await app.close()
    })
  })
})
