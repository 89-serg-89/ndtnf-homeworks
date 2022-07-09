import * as express from 'express'

export default (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('Error: ', err)
  res.status(500)
  res.json({
    error: err.toString()
  })
}
