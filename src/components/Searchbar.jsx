import { Component } from "react"
// import  axios from "axios" 
import { toast } from "react-toastify"

class Searchbar extends Component {
    state = {
        value: ''
    }
    // componentDidMount() {
    //     axios.get(
    //         "https://pixabay.com/api/?q=cat&page=1&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12"
    //     ).then(response => response.json())
    //     .then(list => this.setState({list}))
    // }
    handleChange = (e) => {
        this.setState({value: e.currentTarget.value.toLowerCase()})
        console.log(e.target.value);
    }

    handleSearch = (e) => {
        e.preventDefault();
        if (this.state.value.trim() === '') { 
            return toast.error('搜索')
        }
        this.props.onSubmit(this.state.value)

        this.setState({ value: ''})
        // return data.hits.filter(hit => { 
        //     if (hit.tags.toLowerCase().includes(this.stete.value.toLocaleLowerCase))
        //         return hit
        // })
    }
    render() {
    return  (  <div>
        <form onSubmit={this.handleSearch}>
            <input
                name="search"
                type="text"
                placeholder="search"
                onChange={this.handleChange}
                value={this.state.value}>
            </input>
            <button type="submit"> Search </button>
        </form>
        </div>)
    }
}

export { Searchbar }