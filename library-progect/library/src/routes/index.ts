import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  try {
    res.render('index', {
      title: 'Главная'
    })
  } catch (e: any) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

export = router
