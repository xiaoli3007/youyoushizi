import Cookies from 'js-cookie'

import Lockr from 'lockr'


const TokenKey = 'Admin-Token'
const NameKey = 'Admin-Name'
const UseridKey = 'Admin-Userid'

const voicetypeKey = 'voicetype-c'
const autoplay_timeKey = 'autoplay_time-c'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

export function getUserid() {
  return Cookies.get(UseridKey)
}

export function setUserid(Userid) {
  return Cookies.set(UseridKey, Userid)
}

export function removeUserid() {
  return Cookies.remove(UseridKey)
}



export function getVoicetype() {
  return Lockr.get(voicetypeKey)
}

export function setVoicetype(name) {
  return Lockr.set(voicetypeKey, name)
}

export function getAutoplay_time() {
  return Lockr.get(autoplay_timeKey)
}

export function setAutoplay_time(name) {
  return Lockr.set(autoplay_timeKey, name)
}