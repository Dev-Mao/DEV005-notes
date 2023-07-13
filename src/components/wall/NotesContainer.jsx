import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { app } from '../../lib/firebase';

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore(app);
      const notesRef = collection(db, 'notes');
      const q = query(notesRef, where('author', '==', currentUser.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = [];
        snapshot.forEach((doc) => {
          notesData.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notesData);
      });

      return () => unsubscribe();
    }
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
