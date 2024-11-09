import React from 'react';
import Sidebar from './components/SideBar'
import Dashboard from './components/Dashboard'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="flex-grow p-0 ">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar/>} >
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/inventory/medicines" element={<h1>Medicines</h1>} />
          <Route path="/inventory/groups" element={<h1>Medicine Groups</h1>} />
          <Route path="/reports" element={<h1>Reports</h1>} />
          <Route path="/configuration" element={<h1>Configuration</h1>} />
          <Route path="/contact-management/customers" element={<h1>Customers</h1>} />
          <Route path="/contact-management/suppliers" element={<h1>Suppliers</h1>} />
          <Route path="/notifications" element={<h1>Notifications</h1>} />
          <Route path="/chat" element={<h1>Chat with Visitors</h1>} />
          <Route path="/settings" element={<h1>Application Settings</h1>} />
          <Route path="/covid-19" element={<h1>Covid-19</h1>} />
          <Route path="/support" element={<h1>Get Technical Help</h1>} /> */}
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// import { useState } from 'react'
// import { BrowserRouter,Route,Routes } from 'react-router-dom'
// import Login from './components/Login'
// import Sidebar from './components/SideBar'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//   <>
//   <BrowserRouter>
//   <Routes>
//       <Route path='/' element={<Sidebar/>}>
//       </Route>
//   </Routes>
//   </BrowserRouter>
//   </>
//   )
// }

// export default App
