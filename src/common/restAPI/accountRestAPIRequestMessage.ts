export namespace AccountRestAPIRequestMessages {
  export type Register = {
    id: string,
    password: string,
    nickname: string,
  }

  export type Login = {
    id: string,
    password: string,
  }
}
