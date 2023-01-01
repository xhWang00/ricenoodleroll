import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import AddUnit from './pages/AddUnit';
import PageNotFound from './pages/PageNotFound';
import EditUnit from './pages/EditUnit';
import AddPayment from './pages/AddPayment';

function App() {
  return (
    <div className='container-fluid'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/AddUnit' element={<AddUnit />}></Route>
          <Route path='/AddUnit' element={<AddUnit />}></Route>
          <Route path='/AddPayment/:unitId/:year/:month' element={<AddPayment />}></Route>
          <Route path='/EditUnit/:_id' element={<EditUnit />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
