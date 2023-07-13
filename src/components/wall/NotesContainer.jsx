import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { app } from '../../lib/firebase';

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const currentUser = localStorage.getItem('currentUser');

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
