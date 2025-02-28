import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UsersDocument = Users & Document

@Schema()
export class Users {
  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string
}

export const UsersSchema = SchemaFactory.createForClass(Users)
