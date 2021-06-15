import React from 'react';
import { Block, Text } from 'galio-framework';
import { AuthProvider } from './contex/AuthContext';
import Router from './routers';

const NotifikasiApp = ({}) => {
  
      return (
        <AuthProvider>
          <Router />
        </AuthProvider>
      );  
    
}

export default NotifikasiApp;