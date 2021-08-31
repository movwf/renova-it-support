export interface IAuth {
  login: (props: any) => void;
  logout: () => void;
  isAuth: boolean;
  user: {
    [key: string]: any;
  };
}

export interface IAuthProvider {
  children: JSX.Element;
}

export type UserObject = { username: string | null };
