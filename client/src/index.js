import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const cors = require('cors')
const	corsOptions	=	{		
    origin:	'http://localhost:8080'
}
//const title = 'My Minimal React Webpack Babel Setup struggles';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();
