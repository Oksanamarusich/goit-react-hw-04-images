import Modal from 'react-modal';
import { useState } from 'react';
import "../Modal/Modal.css";
import { GalleryItem,  GalleryImg } from "./ImageGalleryItem.styled";

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ id, picture, picturemodal, alt }) => {
   const [isModalOpen, setIsModalOpen] = useState(false)
    
  const  openModal = () => {
        setIsModalOpen(true);
      };

    const  closeModal = () => {
          setIsModalOpen(false);  
      };

            return (<GalleryItem >
                  <li key = {id}>
                        < GalleryImg src={picture} alt={alt} onClick={openModal} />
                  </li>

                  <Modal
                        
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                         className="Modal"
                         overlayClassName="Overlay"
             
                  >
                        <div>
                            <img className ="modal-picture" src={picturemodal} alt={alt} />
                        </div>
                  </Modal>
            </GalleryItem>)
      }




