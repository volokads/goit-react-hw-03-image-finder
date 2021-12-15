import { Component } from "react";
import axios from "axios";
import ImageGalleryItem from "./ImageGalleryItem";

class ImageGallery extends Component {
    state = {
        listItems: [],
        loading: false
    }
    componentDidUpdate(prevProps, prevState) { 
        if (prevProps.searchValue !== this.props.searchValue) { 
            console.log(prevProps.searchValue, this.props.searchValue);
            this.setState({loading: true})
            setTimeout(() => axios(`https://pixabay.com/api/?q=${this.props.searchValue}&page=1&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
                .then(list => list.data.hits)
                .then(hits => this.setState({ listItems: hits }))
                .finally(() => this.setState({ loading: false }))
                // .then(console.log))
            , 3000)}
    }

    render() { 
        return <div>
            {this.state.loading && <p>Loading...</p>}
            <ul>
                {this.state.listItems.map(item =>{ return (
                    <ImageGalleryItem
                        id={item.id}  
                        user={item.user}
                        img={item.webformatURL}
                        alt={item.tags}
                    />
                )})}
            {/* (this.state.listItems.map(item =>
                 {  return ()} )) */}
            </ul>
        </div>
    }
}
export {ImageGallery}