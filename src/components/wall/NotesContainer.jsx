import { getFirestore, collection, onSnapshot, query, where, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { app } from '../../lib/firebase';
import {RiDeleteBin6Line} from 'react-icons/ri'
import Modal from 'react-modal';
import EditNote from './EditNote';

const NotesContainer = (props) => {
  const [notes, setNotes] = useState([]);
  const [editSuccess, setEditSuccess] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState('');
  const currentUser = localStorage.getItem('currentUser');

  const handleDelete = () => {
    deleteDoc(doc(getFirestore(), 'notes', selectedNote.id));
    setIsModalConfirmOpen(false)
  }

  const handleEdit = (note) =>{      
    setSelectedNote(note)
    setEditSuccess(false)  
    setIsModalEditOpen(true) 
    props.setShowAside(false)
  }

  const handleIconDelete = (note) =>{
    setSelectedNote(note)
    setIsModalConfirmOpen(true)
    props.setShowAside(false)
  }

  useEffect(() => {
  
      const db = getFirestore(app);
      const notesRef = collection(db, 'notes');
      const q = query(notesRef, where('author', '==', currentUser));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = [];
        snapshot.forEach((doc) => {
          notesData.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notesData);
      });

      return () => unsubscribe();
    
  }, [currentUser]);

  return (
    <>
    
        <Modal
            isOpen={isModalConfirmOpen}
            onRequestClose={() => setIsModalConfirmOpen(false)}
            onClick={() => setIsModalConfirmOpen(false)} 
            style={{
              content: {
                width: '400px',
                margin: 'auto',
                padding: '20px',
              },
            }}
            className="modal-confirm"
        >
          <div className='container-modal-confirm'>
          <span>Are you sure you want to delete this note?</span>
          <button className = "btn-cancel" onClick={() => setIsModalConfirmOpen(false)}>No, I do not</button>
          <button className = "btn-confirm" onClick={()=>handleDelete()}>Yes, I do</button>
          </div>
        </Modal>
        
        <div className="container-notes">
        {notes.map((note) => (
            <div className="note-card" key={note.id} onClick={() => handleEdit(note)}>
                <h2 className = "note-title">{note.title}</h2>
                <p className = "note-content">{note.content}</p>
                
                <RiDeleteBin6Line className='icon-delete'  onClick={(event) => {
        event.stopPropagation();
        handleIconDelete(note);
    }}/>
            </div>
        ))}
            <EditNote 
                selectedNote = {selectedNote}
                isOpen = {isModalEditOpen}  
                onRequestClose={() => setIsModalEditOpen(false)} 
                onClick={() => setIsModalEditOpen(false)}
                editSuccess = {editSuccess}
                setEditSuccess = {setEditSuccess}                
            />
        </div>
    </>
  );
};

export default NotesContainer;
