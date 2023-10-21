import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader.js';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import {ButtonLoadMore} from "./ButtonLoadMore/ButtonLoadMore"
import { fetchImages } from 'components/services/api';

import { Layout } from "./Layout";
import { ErrorMessage } from 'components/ErrorMessage.styled';

let galleryImages;

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
 

   useEffect(() => {
    if (searchText === '') {
      return;
    }
    async function getImages() {
      setLoading(true);
      setError(false);
      try {
         galleryImages = await fetchImages(searchText, page);
        
        setImages(prevImages => [...prevImages, ...galleryImages.hits])
        
        if (!galleryImages.hits.length) {
          toast.success("No more pictures. Please, try something else.", { position: 'top-right' })
        }
      } catch (error) {
        
        setError(true);
                
      } finally {
        
        setLoading(false);
      }
    }

    getImages();

  }, [searchText, page]);
  
  const handelSearch = (searchText) => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
  }

  const handlerLoadMore = ({ page }) => {
    setPage(prevPage => prevPage + 1);
  }

  
return (
    <Layout>
        <Searchbar  handelSearch={handelSearch} />
        
     {loading && <Loader />}
     {error && (
          <ErrorMessage>Whoops! Error! Please reload this page!</ErrorMessage>
        )}            
        
     {images.length > 0 && <ImageGallery gallery={images} />} 
        
     {images.length > 0 && images.length < galleryImages.totalHits && <ButtonLoadMore  onClick = {handlerLoadMore} />}
      
        
         <Toaster /> 
      </Layout>
  
  )
  }
