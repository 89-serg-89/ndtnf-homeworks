import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { BooksModule } from './books.module'
import { BooksService } from './books.service'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { Books } from './schemas/books.schema'
import mongoose from 'mongoose'

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
        // MongooseModule.forRoot('mongodb://localhost:27017/nest-netology'),
        BooksModule
      ],
      providers: [
        BooksService,
        {
          provide: getModelToken(Books.name),
          useValue: booksService
        }
      ]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it ('Get /books', async () => {
    try {
      request(app.getHttpServer())
        .get('/api/books')
        .expect(200)
        .expect({
          data: booksService.findAll()
        })
    } catch (e) {
      console.log(e)
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
    await app.close()
  })
})
