import logo from './logo.svg';
import './App.css';
import SearchComponent from './components/SearchComponent';
import FavoritesComponent from './components/FavoritesComponent';

function App() {
  return (
    <div className="App">
      
      <h1>Favorite Quotes</h1>
      <SearchComponent />
      <FavoritesComponent />
    </div>
  );
}

export default App;
