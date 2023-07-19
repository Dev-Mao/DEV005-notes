import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { app } from '../../lib/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const NewNote = (props) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    useEffect(() => {
      let timer;
      if (props.success) {
        timer = setTimeout(() => {
          props.onRequestClose(false);
        }, 1200); // Close the success modal after 3 seconds
      }
      return () => clearTimeout(timer);
    }, [props.success, props]);

    const onSubmit = (data) =>{
            const auth = getAuth(app);
            const title = data.title;
            const content = data.content;
            // Obtén la fecha y hora actual
            const date = new Date();

            // Guarda la fecha y hora en variables separadas
            const day = date.getDate();
            const month = date.getMonth() + 1; // ¡Recuerda que los meses son indexados desde 0!
            const year = date.getFullYear();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            
            // Imprime la fecha y hora en el formato deseado
            const fullDay = `${day}/${month}/${year}`;
            const fullHour = `${hour}:${minutes}`;
            addDoc(collection(getFirestore(), 'notes'), {
              title,
              content,
              author: auth.currentUser.email,
              date:`${fullDay} - ${fullHour}`
            })
            .then(() =>{
              props.setSuccess(true);
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
        className="container-modal-new-note"
      >
        {props.success ? (
    <div className='success'>
      <h2>Success!</h2>
      <p>Your note has been created.</p>
    </div>
  ) : (   
      <form className="form-new-note" onSubmit={handleSubmit(onSubmit)}> 
        <div className="container-input-new-note">           
            <label htmlFor="title">Title</label>   
            <input
                {...register('title', {
                    required: 'Title required', 
                    maxLength: {
                      value: 50,
                      message: 'Max 50 characters',
                  },                              
                })}
                type="text"
                className="input-new-note"
                id="title"
                placeholder="Your title"
                />     
            {errors.title && <p className="error-message">{errors.title.message}</p>}                  
        </div>  

        <div className="container-textarea-new-note">  
            <label htmlFor="content">Content</label>
            <textarea
                {...register('content', { 
                    required: 'Content required',
                    maxLength: {
                        value: 300,
                        message: 'Max 300 characters',
                    },
                })}
                type="text"
                className="textarea-new-note"
                id="content"
                placeholder="Start typing"
                rows="5"
            ></textarea>
            {errors.content && <p className="error-message">{errors.content.message}</p>}                        
        </div>     

        <button type="submit" className="create-btn">Create</button>
      </form> 
      
  )}       
      </Modal>
    );
  };
  
export default NewNote;
  
NewNote.propTypes = {
  success: PropTypes.bool,
  onRequestClose: PropTypes.func,
  isOpen: PropTypes.bool,
  setSuccess: PropTypes.func,
};
