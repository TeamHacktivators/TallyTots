import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ImageUpload from './components/ImageUpload' ;
import Team from './components/Team/Team';
import Hero from './components/hero/hero';
import Navbar from './components/navbar/navbar';
function App() {
  return (
    <>
      <Router>
      <Navbar/>
            <Routes>
              <Route path='/' element={<Hero />}/>
              <Route exact path="/test" element={<ImageUpload />}/>
              <Route exact path="/team" element={<Team/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App