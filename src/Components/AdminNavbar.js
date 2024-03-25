import React from 'react'

export default function AdminNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-0 mb-5 bg-body rounde" >
  <div className="container-fluid">
    
    <a className="navbar-brand" href="#">Chow Food</a>
    <b className="admin">Admin</b>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
      </ul>
      <form className="d-flex">
        
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
      
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/FoodEntry"><b>Food Entry</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/UserList"><b>User List</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/OrderList"><b>Order List</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/"><b>LogOut</b></a>
        </li>
        
       
      </ul>
      </div>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
