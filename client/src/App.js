// Import hooks and packages
import {Routes, Route} from 'react-router-dom'

// Import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Selection from './pages/Selection';
import Instructions from './pages/Instructions';
import TechQuiz from './pages/quizzes/TechQuiz';
import Technical from './components/domainSelectors/Technical';
import Management from './components/domainSelectors/Management';
import Project from './components/domainSelectors/Project';
import Design from './components/domainSelectors/Design';
import Admin from './pages/Admin';
import Logout from './pages/Logout';
import Rough from './pages/Rough';

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
        <Route path='/instructions' element={<Instructions/>} />
        <Route path='/technical' element={<Technical/>} />
        <Route path='/management' element={<Management/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/design' element={<Design/>} />
        <Route path='/test' element={<TechQuiz/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/rough' element={<Rough/>} />
        <Route path='*' element={<h1>Oh-Oh! Page not found. 404</h1>}/>
      </Routes>
    </div>
  );
}

export default App;