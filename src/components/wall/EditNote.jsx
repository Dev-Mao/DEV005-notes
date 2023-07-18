import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { getFirestore, updateDoc, doc} from 'firebase/firestore';

const EditNote = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onSubmit = (data) =>{
            updateDoc(doc(getFirestore(), 'notes', props.selectedNote.id), data)
            .then(() =>{
                props.setEditSuccess(true)
                reset()
      });          
    }


    return (
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
        className="modal-content"
      >
        {props.editSuccess ? (
    <div>
      <h2>Success!</h2>
      <p>Your note has been edited.</p>
    </div>
  ) : (
    <form className="form-login" onSubmit={handleSubmit(onSubmit)}> 
      <div className="container-input-new-note">           
          <label htmlFor="title">Title:</label>   
          <input
              {...register('title', {
                  required: 'Title required',                               
              })}
              type="text"
              className="input-new-note"
              id="title"
              placeholder="Title"
              defaultValue={props.selectedNote.title}
              />     
          {errors.title && <p className="error-message">{errors.title.message}</p>}                  
      </div>  

      <div className="container-input-new-note">  
          <label htmlFor="content">Content:</label>
          <textarea
              {...register('content', { 
                  required: 'content required',
                  maxLength: {
                      value: 300,
                      message: 'Max 300 characters',
                  },
              })}
              type="text"
              className="input-login"
              id="content"
              placeholder="Content"
              rows="5"
              defaultValue={props.selectedNote.content}
          ></textarea>
          {errors.content && <p className="error-message">{errors.content.message}</p>}                        
      </div>     

      <button type="submit" className="submit-btn">Edit</button>
    </form> 
  )}       
      </Modal>
    );
  };
  
export default EditNote;
  
