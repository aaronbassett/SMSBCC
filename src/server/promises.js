// @flow

import _ from 'lodash'
import Nexmo from 'nexmo'
import { WEBHOOK_URL, FROM, TO } from '../shared/config'

export function searchNumber(client: Nexmo, countryCode: string) {
  return new Promise((resolve, reject) => {
    client.number.search(countryCode, { size: 1, features: 'SMS' }, (error, response) => {
      if (!_.isError(error) && response.count >= 1) {
        resolve(response.numbers[0])
      } else {
        reject(new Error(`Cannot find number for country ${countryCode}`))
      }
    })
  })
}

export function buyNumber(client: Nexmo, number: any) {
  return new Promise((resolve, reject) => {
    client.number.buy(number.country, number.msisdn, (error) => {
      if (!_.isError(error)) {
        resolve(number)
      } else {
        reject(new Error(`Could not buy number for country ${number.country}`))
      }
    })
  })
}

export function updateNumber(client: Nexmo, number: any) {
  return new Promise((resolve, reject) => {
    const options = { moHttpUrl: WEBHOOK_URL }
    client.number.update(number.country, number.msisdn, options, (error, response) => {
      if (!_.isError(error) && response['error-code'] === '200') {
        resolve(number)
      } else {
        reject(new Error(`Could not set forwarding for ${number.msisdn}`))
      }
    })
  })
}

export function sendMessage(client: Nexmo, message: string) {
  return new Promise((resolve) => {
    client.message.sendSms(FROM, TO, message, (error, response) => {
      resolve(response)
    })
  })
}
