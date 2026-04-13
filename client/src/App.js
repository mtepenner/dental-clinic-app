import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Layout/NavBar';
import Home from './pages/Patient/Home';
import BookVisit from './pages/Patient/BookVisit';
import Dashboard from './pages/Staff/Dashboard';
import Login from './pages/Auth/Login';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="content-container">
          <Routes>
            {/* Public/Patient Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookVisit />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Staff Route (Simplified for now) */}
            <Route path="/staff/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
