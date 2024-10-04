import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
//import HomePage from './components/home/HomePage';



function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthPage/>}/>
    </Routes>
  );
}

export default App;
