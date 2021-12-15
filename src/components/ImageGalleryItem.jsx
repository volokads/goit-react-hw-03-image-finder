function ImageGalleryItem({ id, user,img, alt}) {
    return (
        <li id={id} key={id}>
            <p> {user}</p>
            <img src={img} alt={ alt }/>
        </li>
    )
}
export default ImageGalleryItem