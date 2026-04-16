import { Link } from 'react-router-dom';
import './NavBar.css'; // Assuming you have some basic CSS

export default function NavBar() {
  // In a real app, you would check your AuthContext here 
  // to see if a staff member is logged in.
  const isStaffLoggedIn = false; 

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/">🦷 BrightSmile Dental</Link>
      </div>
      <nav className="navbar-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/book" className="nav-item btn-primary">Book Visit</Link>
        
        {isStaffLoggedIn ? (
          <Link to="/staff/dashboard" className="nav-item">Dashboard</Link>
        ) : (
          <Link to="/login" className="nav-item nav-login">Staff Login</Link>
        )}
      </nav>
    </header>
  );
}
