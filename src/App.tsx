/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';

import './App.css';

const App = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
