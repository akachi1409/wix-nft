import './App.css';

import Header from "./components/header/header"
import Utility from './components/utility/utility';
import Roadmap from './components/roadmap/roadmap';
import Metaverse from './components/metaverse/metaverse';
import State from './components/state/state';
import Footer from './components/footer/footer';
function App() {
  return (
    <div className="App">
        <Header/>
        <Utility/>
        <Roadmap/>
        <Metaverse/>
        <State/>
        <Footer/>
    </div>
  );
}

export default App;
