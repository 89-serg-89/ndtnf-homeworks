import { Router } from 'express'
import { auth } from '../../helpers/passport'
import { getHash } from '../../helpers/crypto'
import { container } from '../../configs/inversity.config'
import { UserService } from '../../modules/user/user.service'
const router = Router()

router.post('/login', auth, (req, res) => {
  try {
    res.status(201)
    res.header('Access-Control-Allow-Origin', '*')
    res.json('success')
  } catch (e) {
    console.log('Error:', e)
    res.status(404)
    res.end()
  }
})

router.post('/signup', async (req, res) => {
  try {
    const userService = container.get(UserService)
    const candidate = await userService.getUser({ login: req.body.login })
    if (candidate.length) {
      res.status(200)
      return res.json({
        error: 'Логин занят'
      })
    }
    const user = await userService.createUser({
      ...req.body,
      password: getHash(req.body.password)
    })
    res.status(201)
    res.json(user)
  } catch (e) {
    console.log('Error:', e)
    res.status(404)
    res.end()
  }
})

export = router
