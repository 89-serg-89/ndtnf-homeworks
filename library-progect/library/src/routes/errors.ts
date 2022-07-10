import { Router } from 'express'
const router = Router()

router.get('/404', (req, res) => {
  res.render('error/404', {
    title: '404 | Нет такой страницы'
  })
})

export = router
