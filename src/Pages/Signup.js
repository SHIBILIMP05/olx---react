import React from 'react';

import Signup from '../Components/Signup/Signup';
import { Toaster } from 'sonner';

function SignupPage() {
  return (
    <div>
      <Toaster position='top-center' richColors/>
      <Signup />
    </div>
  );
}

export default SignupPage;
