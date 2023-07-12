import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { app } from '../../lib/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';


const NewNote = ({ isOpen, onRequestClose }) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) =>{
            const auth = getAuth(app);
            const title = data.title;
            const content = data.content;
            addDoc(collection(getFirestore(), 'notes'), {
              title,
              content,
              author: auth.currentUser.email,
            });          
    }
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            padding: '20px',
          },
        }}
        className="modal-content"
      >
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
                        ></textarea>
                        {errors.content && <p className="error-message">{errors.content.message}</p>}                        
                    </div>     

                    <button type="submit" className="submit-btn">Create</button>
                </form> 
      </Modal>
    );
  };
  
  export default NewNote;
  
