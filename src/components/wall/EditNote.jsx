import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { getFirestore, updateDoc, doc} from 'firebase/firestore';
import { useEffect } from 'react';

const EditNote = (props) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()

    const onSubmit = (data) =>{
            updateDoc(doc(getFirestore(), 'notes', props.selectedNote.id), data)
            .then(() =>{
                props.setEditSuccess(true)
                reset()
      });          
    }

  

    useEffect(() => {
      if (props.selectedNote.title) {
        setValue('title', props.selectedNote.title);
      }
  
      if (props.selectedNote.content) {
        setValue('content', props.selectedNote.content);
      }
    }, [props.selectedNote, setValue]);

    return(
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        onClick={props.onRequestClose} 
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            padding: '20px',
          },
        }}
        className="modal-edit"
      >
        {props.editSuccess ? (
    <div>
      <h2>Success!</h2>
      <p>Your note has been edited.</p>
    </div>
  ) : (
    <form className="note-card-edit" onSubmit={handleSubmit(onSubmit)}> 
      <div className="container-input-edit-note">           
          <label htmlFor="title">Title</label>   
          <input
              {...register('title', {
                  required: 'Title required',                               
              })}
              type="text"
              className="input-edit-note"
              id="title"
              placeholder="Ypur title"
              defaultValue={props.selectedNote.title}
              />     
          {errors.title && <p className="error-message">{errors.title.message}</p>}                  
      </div>  

      <div className="container-textarea-edit-note">  
          <label htmlFor="content">Content</label>
          <textarea
              {...register('content', { 
                  required: 'content required',
                  maxLength: {
                      value: 300,
                      message: 'Max 300 characters',
                  },
              })}
              type="text"
              className="textarea-edit-note"
              id="content"
              placeholder="Start typing"  
              defaultValue={props.selectedNote.content}
          ></textarea>
          {errors.content && <p className="error-message">{errors.content.message}</p>}                        
      </div>     

      <button type="submit" className="edit-btn">Save</button>
    </form> 
  )}       
      </Modal>
    );
  };
  
export default EditNote;
  
