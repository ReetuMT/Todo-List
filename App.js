import ToDo from './Components/ToDo-list';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Updatefruit from './Components/Updatefruit';

function App() {
  return (
 
    <div className='App'>

    <BrowserRouter>
      <Routes>
        <Route path='/todo' Component={ToDo} />
      </Routes>
      <Routes>
        <Route path='/update/:id' Component={Updatefruit} />
      </Routes>
    </BrowserRouter>
    </div>
  
  )
}

export default App;
