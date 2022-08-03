import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Users, UsersSchema } from './schemas/users.schema'
import { UsersController } from './users.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Users.name,
      schema: UsersSchema
    }])
  ],
  controllers: [UsersController],
  providers: []
})
export class UsersModule {  }
