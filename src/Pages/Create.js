import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { Toaster } from 'sonner';

const CreatePage = () => {
  return (
    <Fragment>
      <Toaster position='top-center' richColors/>
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
