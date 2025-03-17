import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'
import CounterPage from './CounterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/counter" element={<CounterPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
