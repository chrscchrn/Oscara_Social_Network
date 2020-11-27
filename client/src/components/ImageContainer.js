import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  { API_URL } from '../helpers/API_URL';

const ImageContainer = ({ newImage }) => {

    const [ images, setImages ] = useState([]);
    const [ fallback, setFallBack ] = useState('');
    const getImages = async () => {
        try {
            const res = await axios.get('/api/images');
            if (!res.data.files ) {
                setFallBack(res.data.message);
                return;
            } else {
                setImages(res.data.files);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getImages();
    }, [ newImage ]);

    const configureImage = image => {
        return API_URL + "/" + image;
    }

    return (
        <div>
            {images.length > 0 ? 
            (
                images.map(image => (
                    <img src={configureImage(image)} key={image} alt={image} width="200" height="200" />
                ))
            )     
            :
            <>
                <h1>
                    {fallback.path}
                </h1>
                <hr />
                <h3>Upload Images in the Form Below</h3>
            </>
            }
        </div>
    )
}
export default ImageContainer;