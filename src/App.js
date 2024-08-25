import './App.css';
import ContentImageUpload from './components/ContentImageUpload'; // Ensure this matches the file name
import StyleImageUpload from './components/StyleImageUpload';   // Ensure this matches the file name

function App() {
  return (
    <div className="App">
      <h1>Image Style Transfer</h1>
      <StyleImageUpload />
      <ContentImageUpload />
    </div>
  );
}

export default App;
