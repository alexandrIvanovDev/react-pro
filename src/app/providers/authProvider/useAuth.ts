import { useContext } from 'react';

import { AuthContext, type AuthContextType } from './AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('Some error');
  }

  return context;
};
