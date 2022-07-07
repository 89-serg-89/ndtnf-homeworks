import { injectable } from 'inversify'
import { IUserRepository } from './user.repository'
import UserModel from '../../models/user'

@injectable()
export class UserService implements IUserRepository{
  createUser (body: object) {
    const user = new UserModel(body)
    return user.save()
  }

  getUser (params: object) {
    return UserModel.find(params)
  }
}
