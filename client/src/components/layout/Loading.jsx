import React, { Fragment } from 'react';
import doubleRing from './doubleRing.gif'

const Loading = () => {
  return (
    <Fragment>
      <img src={doubleRing}
           style={{maxWidth: '100px', margin: 'auto', display: 'block'}}
           alt='loading..'
      />
    </Fragment>
  );
};

export default Loading;
