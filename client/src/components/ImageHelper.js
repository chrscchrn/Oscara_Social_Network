import React, { useState } from 'react'
import ImageContainer from './ImageContainer';
import ImageForm from './imageform';

const ImageHelper = (props) => {
    const [ newImage, setNewImage ] = useState([])

    const handleNewImage = () => {
        setNewImage([...newImage, 'New Image!' ])
    }

    return (
        <div>
            <ImageContainer newImage={newImage} />
            <ImageForm handleNewImage={handleNewImage} email={props.email}/>
        </div>
    )
}

export default ImageHelper
