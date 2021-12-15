import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
import {Component} from 'react'
import { Searchbar } from './components/Searchbar.jsx'
import {ImageGallery} from './components/ImageGallery.jsx'

// axios.get("https://pixabay.com/api/?q=cat&page=1&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12")
// .then((response) => {
//   console.log(response.data.hits);
//   return response.data.hits
// })
class App extends Component {
  state = {
    value: ''
  }

  handleFormSearch = value => { 
    this.setState({ value })
  }
  render(){ 
    
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSearch} />
        <ImageGallery searchValue={ this.state.value}/>
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default App;
