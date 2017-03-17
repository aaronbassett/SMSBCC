// @flow

export const isProd = process.env.NODE_ENV === 'production'
export const WEB_PORT = process.env.PORT || 8008
export const FROM = process.env.NEXMO_FROM || 'SMSBCC'
export const TO = process.env.NEXMO_TO
export const API_KEY = process.env.NEXMO_API_KEY
export const API_SECRET = process.env.NEXMO_API_SECRET
