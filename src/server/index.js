// @flow

import express from 'express'
import Nexmo from 'nexmo'
import _ from 'lodash'

import { isProd, WEB_PORT, API_KEY, API_SECRET } from '../shared/config'
import { searchNumber, buyNumber, updateNumber, sendMessage } from './promises'

const app = express()


app.get('/', (req, res) => {
  if (req.query.text) {
    const msg: string = _.trim(req.query.text)
    const client = new Nexmo({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
    })

    if (_.startsWith(_.toUpper(msg), 'NEW')) {
      // We need a new virtual number
      const countryCode: string = msg.split(' ')[1]

      searchNumber(client, _.toUpper(countryCode)).then((number) => {
        buyNumber(client, number).then((number) => {
          updateNumber(client, number).then((number) => {
            sendMessage(client, `Your new ${number.country} virtual number is ${number.msisdn}`)
          }, (error) => {
            sendMessage(client, error.message)
          })
        }, (error) => {
          sendMessage(client, error.message)
        })
      })
    } else {
      sendMessage(client, msg)
    }
  }
  res.send()  // Always return a 200 OK for Nexmo
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development)'}.`)
})
