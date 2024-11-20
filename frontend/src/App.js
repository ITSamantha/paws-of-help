import logo from './logo.svg';
import logo1 from './logo.png';
import './App.css';
import  Header  from './components/base/header/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <img src={logo1}></img>
    </div>
  );
}

export default App;
