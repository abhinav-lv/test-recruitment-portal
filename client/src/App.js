// Import hooks and packages
import {Routes, Route} from 'react-router-dom'

// Import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Selection from './pages/Selection';
import Logout from './pages/Logout';

// Import global styles
import './styles/global.css'

/* ---------------------------------------------------------------- */

// APP
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/selection' element={<Selection/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='*' element={<h1>Oh-Oh! Page not found. 404</h1>}/>
      </Routes>
    </div>
  );
}

export default App;