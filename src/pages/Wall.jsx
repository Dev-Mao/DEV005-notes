import BtnLogout from "../components/BtnLogout";
import NewNote from "../components/wall/NewNote";
import NotesContainer from "../components/wall/NotesContainer";
import { useState, useEffect } from 'react';
import Logo from '../assets/img/logoLabWhite.png'
import {FiMenu} from 'react-icons/fi'

const Wall = () => {    

    const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showAside, setShowAside] = useState(false);


    const openModal = () => {
      setShowAside(false);
      setIsModalOpen(true);
      setSuccess(false);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleShowAside = () => {
      setShowAside(true)
    }
    const handleHideAside = () => {
      setShowAside(false)
    }
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); 

    return (
        <>
            <div className = "background-wall"></div>            
            
              {windowWidth > 900 && (
                <aside className="container-btn-new-note">
                  <img className="logo" src={Logo} alt="" />
                  <button className="btn-new-note" onClick={openModal}>New note</button>
                  <BtnLogout/>
                </aside>                    
              )}
               {windowWidth < 900 && (
                  <>
                    <FiMenu className="icon-menu" onClick={handleShowAside} />
                    {showAside && (
                      <aside className="container-btn-new-note-lil">
                         <FiMenu className="icon-menu-lil" onClick={handleHideAside} />
                        <img className="logo" src={Logo} alt="" />
                        <button className="btn-new-note" onClick={openModal}>
                          New note
                        </button>
                        <BtnLogout />
                      </aside>
                    )}
                  </>
                )}
              <NotesContainer setShowAside = {setShowAside}/>    
            <NewNote success = {success} setSuccess = {setSuccess} isOpen={isModalOpen} onRequestClose={closeModal} />
            
        </>
    );
};

export default Wall;