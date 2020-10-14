import React, { useState } from 'react'
import ImageContainer from './ImageContainer';
import ImageForm from './imageform';

const ImageHelper = () => {
    const [ newImage, setNewImage ] = useState([])

    const handleNewImage = () => {
        setNewImage([...newImage, 'New Image!' ])
    }

    return (
        <div>
            <ImageContainer newImage={newImage} />
            <ImageForm handleNewImage={handleNewImage} />
        </div>
    )
}

export default ImageHelper
