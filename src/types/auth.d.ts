export type RegisterBody = {
  login: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type LoginBody = {
  login: string
  password: string
  sessionId: string
}

export type LogoutBody = {
  login: string
  sessionId: string
}
