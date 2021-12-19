import { Component } from "react";
import Loader from 'react-loader-spinner'
import axios from "axios";
import ImageGalleryItem from "./ImageGalleryItem";
import Button from './Button'
import { Modal } from "./Modal"


class ImageGallery extends Component {
    state = {
        listItems: [],
        status: 'idle',
        showModal: false, 
        tryPage: 1, 
        modalImage: ''
    }
    componentDidUpdate(prevProps, prevState) { 
        if (prevProps.searchValue !== this.props.searchValue) { 
            console.log(prevProps.searchValue, this.props.searchValue);
            this.setState({status: "pending"})
            setTimeout(() => axios(`https://pixabay.com/api/?q=${this.props.searchValue}&page=${this.state.tryPage}&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
                .then(list => list.data.hits)
                .then(hits => this.setState({ listItems: hits, status: "resolved", tryPage: 1 }))
                // .then(console.log))
            , 1000)}
    }
    nextPage = () => { 
        this.state.tryPage += 1
        axios(`https://pixabay.com/api/?q=${this.props.searchValue}&page=${this.state.tryPage}&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
            .then(list => list.data.hits)
            .then(hits => this.setState(prevState => ({listItems: [...prevState.listItems, ...hits]})))
    }
    toggleModal = () => { 
        this.setState({
            showModal: !this.state.showModal
        })
    }
    onPicClick = (e) => { 
        console.log(e.target.dataset);
        this.setState({
            modalImage: e.target.dataset.source
        })
        console.log(this.state.modalImage);
     }

    render() { 
        if (this.state.status === "idle") { 
            return <div></div>
        }
        if (this.state.status === "pending") { 
            return <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={1000} //1 secs
                    />
        }
        if (this.state.status === "resolved") { 
            return <>
            <ul className="ImageGallery">
                {this.state.listItems.map(item =>{ return (
                    <ImageGalleryItem
                        img={item.webformatURL}
                        largeImage={item.largeImageURL}
                        alt={item.tags}
                        id={item.id}
                        onClick={this.onPicClick}
                        openModal={ this.toggleModal}
                    />
                )})}
                </ul>
                <Button loadMore={this.nextPage}/>
                {this.state.showModal && (
                    <Modal switch={this.toggleModal}>
                        <img className="modalImage" src={ this.state.modalImage} alt=''/>
                    </Modal>
                )}
                </>
        }
    }
}
export {ImageGallery}