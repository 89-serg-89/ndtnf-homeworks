import { Body, Controller, Post, Res } from '@nestjs/common'
import { SignupDto } from './dto/signup.dto'
import { JoiValidationPipe } from '../pipies/joi-validation.pipe'
import { createSchema } from './joi/signup.schema'

@Controller('api/users')
export class UsersController {

  @Post('/signup')
  async signUp (
    @Res() res,
    @Body(new JoiValidationPipe(createSchema)) body: SignupDto
  ) {
    console.log(body)
    try {
      console.log('signup')
    } catch (e) {

    }
  }

  @Post()
  async signIn (@Res() res) {
    try {

    } catch (e) {

    }
  }
}
