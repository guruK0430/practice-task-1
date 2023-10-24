
import './App.css';
import { Link, Route, Routes} from "react-router-dom"
import Layout from './layout/Layout' 
import EmiCalculator from './emi/EmiCalculator' 
import Vgallery from './v-gallery/Vgallery' 
import Shoppingcart from './shopping-cart/ShoppingCart'
import ReactTable from './react-table/ReactTable';


function App() {
  
  return (<>
    <div className="App">
      <Routes>
        <Route path='/shoppingCart' element={<Shoppingcart />}></Route>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/emicalculator" element={<EmiCalculator />}></Route>
        <Route path="/videogallery" element={<Vgallery />}></Route>
        <Route path="/reacttable" element={<ReactTable />}></Route>
        <Route path="*" element={<h2>Page not found</h2>}></Route>
      </Routes>
    </div>





















    {/*<>
    <Routes>
        <Route path="/p" element={<About />}></Route>
    </Routes>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/book/:id" element={<Book />}></Route>
        <Route path="*" element={<NotFount />}></Route>
      </Routes>
    </>*/}
    </>
  );
  
}

export default App;
