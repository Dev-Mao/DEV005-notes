// Importa las dependencias necesarias
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { app } from '../../lib/firebase';
const NotesContainer = () => {
    const [notes, setNotes] = useState([]);
   
    useEffect(() => {
        const db = getFirestore(app);
        const unsubscribe = onSnapshot(collection(db, 'notes'), (snapshot) => {
          const notesData = [];
          snapshot.forEach((doc) => {
            notesData.push({ id: doc.id, ...doc.data() });
          });
          setNotes(notesData);
        });    
        return () => unsubscribe();
      }, []);
    
    return (
        <div className="container-notes">
             {notes.map((note) => (
                <div className="note-card" key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default NotesContainer;
