import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a className="navbar-brand" href="/" title="Blog App">Blog Website</a>
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <a className="nav-link" title="Register" href="/register">Register <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" title="Login" href="/login">Login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" title="This feature will be updated soon" href="#">Report any user</a>
      </li>
    </ul>
       </div>
      </nav>
        </div>
    )
}

export default Navbar
