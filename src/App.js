
import React, { useState, Suspense } from 'react';
import './App.css';
import Cabinets from "./kitchen-cabinets"
// import Hospital from "./hospital"
import House from "./kitchen"
import Bedroom from "./bedroom"
import Home from "./modern_office"
const Preloader = React.lazy(() => import('./utils/Preloader'));

function App() {
  const[active, setActive] = useState(1)
  return (
    <>
    <div className="main-app">
      <div className={`menu ${active===1 ? 'menu_active': ''}`} onClick={() => setActive(1)}>Kitchen</div>
      <div className={`menu ml-5 ${active===2 ? 'menu_active': ''}`} onClick={() => setActive(2)}>Bedroom</div>
      {/* <div className={`menu ${active===3 ? 'menu_active': ''}`} onClick={() => setActive(3)}>Bedroom</div>
      <div className={`menu ${active===4 ? 'menu_active': ''}`} onClick={() => setActive(4)}>Home</div> */}
    </div>
    {/* <Preloader /> */}
    <Suspense fallback={<><Preloader /></>}>
    {active === 1 && <House />}
    {active === 2 && <Bedroom />}
    </Suspense>
    {/* {active === 3 && }
    {active === 4 && <Home />} */}
    </>
  );
}

export default App;
