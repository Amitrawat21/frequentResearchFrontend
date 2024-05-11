
import './App.css';
import Register from './Pages/Home.js';
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Profile from './Pages/Profile';
import Header from './Component/Header.js';



function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/' element  = {<Register/>}/>
  <Route path='/profile/:id' element  = {<Profile/>}/>
</Routes>


</BrowserRouter>
  );
}

export default App;
