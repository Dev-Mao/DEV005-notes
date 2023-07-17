import BtnLogout from "../components/BtnLogout";
import NewNote from "../components/wall/NewNote";
import NotesContainer from "../components/wall/NotesContainer";
import { useState } from 'react';

const Wall = () => {    

    const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
      setIsModalOpen(true);
      setSuccess(false);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

 

    return (
        <>
            <div className = "background-wall"></div>
            <button onClick={openModal}>New note</button>
            <NewNote success = {success} setSuccess = {setSuccess} isOpen={isModalOpen} onRequestClose={closeModal} />
            <BtnLogout/>
            <NotesContainer/>
        </>
    );
};

export default Wall;