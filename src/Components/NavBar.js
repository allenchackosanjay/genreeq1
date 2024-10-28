import React from 'react'
//import logo from 'C:\Users\hp\Downloads\image 4.svg';
export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#121212' }}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#" style={{ color: '#FFFFFF' }}>{props.title}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      import logo from 'C:\Users\hp\Downloads\image 4.svg';  
        
      </ul>
      <form className="d-flex" role="search">
        
        <button className="btn btn-outline-success" type="submit">Profile</button>
      </form>
    </div>
  </div>
</nav>
  )
}

