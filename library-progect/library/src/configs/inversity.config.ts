import { Container } from 'inversify'
import { BookService } from '../modules/book/book.service'
import { UserService } from '../modules/user/user.service'

const container = new Container()
container.bind(BookService).toSelf()
container.bind(UserService).toSelf()

export { container }
