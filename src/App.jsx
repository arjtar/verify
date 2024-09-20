// import { useState } from 'react'

// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
      
//       <h1 className='h1'>Verification</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
       
//       </div>
      
//     </>
//   )
// }

// export default App



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerificationForm from './components/VerificationForm';
import Success from './components/Success';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<VerificationForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  </Router>
);

export default App;