export const LOGIN = 'LOGIN' as const;
export const LOGOUT = 'LOGOUT' as const;

namespace Actions {
  export const login = (token: string, id: string, nickname: string) => ({
    type: LOGIN,
    id,
    nickname,
    token,
  });

  export const logout = () => ({
    type: LOGOUT,
  })
}

export default Actions;

const actions = [
  Actions.login,
  Actions.logout,
] as const;

export type Action = ReturnType<typeof actions[number]>

