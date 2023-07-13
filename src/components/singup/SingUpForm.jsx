import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from "../../lib/firebase.js";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const SignUpForm = () => {
    const navigate = useNavigate();
    // Llamado a funciones para formularios
    const { register, handleSubmit, formState: { errors } } = useForm()

    // Manejar el envío del formulario y hacer la solicitud de la api para crear usuario
    const onSubmit = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
            localStorage.setItem('currentUser', auth.currentUser.email)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleClickSignin = () => {
        navigate('/')
    }
    
    return (
        <>
            <section className="section-signup">
                <form className="form-signup" onSubmit={handleSubmit(onSubmit)}> 
                    <div className="container-input-new-employee">           
                        <AiOutlineMail className="icon-form" />
                        <label htmlFor="email">Email:</label>   
                        <input
                            {...register('email', {
                                required: 'Email required',
                                pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email'
                                }
                            })}
                            type="text"
                            className="input-signup"
                            id="email"
                            placeholder="Email"
                            />     
                        {errors.email && <p className="error-message">{errors.email.message}</p>}                  
                    </div>  
            
                    <div className="container-input-signup">  
                        <AiOutlineLock className="icon-form" />
                        <label htmlFor="password">Password:</label>
                        <input
                            {...register('password', { 
                                required: 'Password required',
                                minLength: {
                                    value: 4,
                                    message: 'Password too short',
                                },
                             })}
                            type="password"
                            className="input-signup"
                            id="password"
                            placeholder="Password"
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}                        
                    </div>     

                    <button type="submit" className="submit-btn">Register</button>
                </form>
                <span>Do you already have an account? <a href="" onClick={handleClickSignin}>Sign In</a></span>           
            </section>
        </>
    );
  };

export default SignUpForm;