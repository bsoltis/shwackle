import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './index.scss';

// import App from './components/App';
//vimport Firebase, { FirebaseContext } from './components/Firebase';

// ReactDOM.render(
//     <FirebaseContext.Provider value={new Firebase()}>
//         <App />
//     </FirebaseContext.Provider>,
//     document.getElementById('root')
// );

ReactDOM.render(<App />, document.getElementById('root'));