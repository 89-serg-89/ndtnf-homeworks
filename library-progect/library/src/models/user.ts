import { Schema, model } from 'mongoose'

interface IUser {
  _id: string
  login: string
  password: string
  username?: string
  email?: string
}

const userSchema = new Schema<IUser>({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String
  }
})

export default model<IUser>('Users', userSchema)
