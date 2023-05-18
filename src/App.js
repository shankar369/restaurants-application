import { useContext } from 'react';
import './App.css';
import LightBox from './components/LightBox';
import Navbar from './components/Navbar';
import RestaurantContextProvider from './contexts/restaurantContext';
import { UtilContext } from './contexts/utilContext';
import Routing from './routing/Routing';
import ClockLoader from "react-spinners/ClockLoader"



function App() {
  const {loading} = useContext(UtilContext)

  return (
    <RestaurantContextProvider>
      <div className="App">
        <Routing>
            <Navbar/>
        </Routing>
            <div>
                {loading &&<LightBox> <ClockLoader color={"white"} loading={loading} size={100} /> </LightBox>}
            </div>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
