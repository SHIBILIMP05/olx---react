import React from 'react';
import Login from '../Components/Login/Login';
import { Toaster } from 'sonner';

function LoginPage() {
  return (
    <div>
      <Toaster position='top-center' richColors />
      <Login />
    </div>
  );
}

export default LoginPage;
