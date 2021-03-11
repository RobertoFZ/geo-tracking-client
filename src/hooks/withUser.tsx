import { User } from 'api/User/declarations';
import { useState } from 'react';

export type WithUserProps = {
  user?: User;
  rememberMe?: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const withUser = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }: P) => {
  const USER_KEY = 'user';

  const getUser = (): User | null => {
    const userString = localStorage.getItem(USER_KEY);
    if (!userString) {
      return null
    }
    const user = JSON.parse(userString);
    return user
  };

  const [user, setUser] = useState<User | null>(getUser());

  const saveUser = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
  };

  const clearUser = () => localStorage.removeItem(USER_KEY);

  return <Component
    user={user}
    setUser={saveUser}
    clearUser={clearUser}
    {...props as P}
  />
};

export default withUser;