// @flow

import express from 'express'
import Nexmo from 'nexmo'

import { isProd, WEB_PORT, FROM, TO, API_KEY, API_SECRET } from '../shared/config'

const app = express()

app.get('/', (req, res) => {
  if (req.query.text) {
    const client = new Nexmo({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
    })
    client.message.sendSms(FROM, TO, req.query.text)
  }
  res.send()  // respond to Nexmo with a 200 OK
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development)'}.`)
})
