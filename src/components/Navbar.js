import React , { useEffect } from 'react'
import { Link , useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Alert from './Alert'
const Navbar = () => {
  let navigate = useNavigate();
  const location =  useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
    
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link >
          
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link >
              </li>
            </ul>
            {!localStorage.getItem('token')? <form className="d-flex">
              <Link className="btn btn-outline-success mx-2" to= '/login' role="button">Login</Link>
              <Link className="btn btn-outline-success mx-2" to= '/signup' role="button">Signup</Link>
            </form> : <button onClick={handleLogout} className="btn btn-outline-success mx-2">Logout</button>}
          </div>
        
      </nav>
      
    </div>
  )
}

export default Navbar;
