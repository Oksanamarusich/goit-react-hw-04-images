import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import {ButtonLoadMore} from "./ButtonLoadMore/ButtonLoadMore"
import { fetchImages } from 'components/services/api';

import { Layout } from "./Layout";
import { ErrorMessage } from 'components/ErrorMessage.styled';


export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  
  const handelSearch = (searchText) => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
    
   
  }

  const handlerLoadMore = ({ page }) => {
    setPage = (prevState=>prevState + 1)
  
   
  }

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    async function getImages() {
      setLoading(true);
      setError(false);
      try {
        const galleryImages = await fetchImages(searchText, page);
        // this.setState(prevState => ({images: [...prevState.images, ...galleryImages.hits]}));
        setImages(prevState => [...prevState.images, ...galleryImages.hits])
        
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
 
  
  return (
    <Layout>
        <Searchbar  handelSearch={handelSearch} />
        
     {loading && <RotatingLines
           strokeColor="grey"
           strokeWidth="5"
           animationDuration="0.75"
           width="96"
           visible={true}
          />}
     {error && (
          <ErrorMessage>Whoops! Error! Please reload this page!</ErrorMessage>
        )}            
        
     {images.length > 0 && <ImageGallery gallery={images} />} 
        
     {images.length > 0 && <ButtonLoadMore  onClick = {handlerLoadMore} />}
      
        
         <Toaster /> 
      </Layout>
  
  )
  }
