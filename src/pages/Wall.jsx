import BtnLogout from "../components/BtnLogout";
import NewNote from "../components/wall/NewNote";
import { useState } from 'react';

const Wall = () => {    

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={openModal}>New note</button>
            <NewNote isOpen={isModalOpen} onRequestClose={closeModal} />
            <BtnLogout/>
        </>
    );
};

export default Wall;