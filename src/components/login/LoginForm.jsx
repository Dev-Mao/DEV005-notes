import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from "../../lib/firebase.js";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const LoginForm = () => {
    const navigate = useNavigate();
    // Llamado a funciones para formularios
    const { register, handleSubmit, formState: { errors } } = useForm()

    // Manejar el envío del formulario y hacer la solicitud de la api para crear usuario
    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleClickSignup = () => {
        navigate('/signup')
    }
    
    return (
        <>
            <section className="section-login">
                <form className="form-login" onSubmit={handleSubmit(onSubmit)}> 
                    <div className="container-form">           
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
                            className="input-login"
                            id="email"
                            placeholder="Email"
                            />     
                        {errors.email && <p className="error-message">{errors.email.message}</p>}                  
                    </div>  
            
                    <div className="container-input-login">  
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
                            className="input-login"
                            id="password"
                            placeholder="Password"
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}                        
                    </div>     

                    <button type="submit" className="submit-btn">Login</button>
                </form> 
                <span>You do not have an account yet? <a href="" onClick={handleClickSignup}>Sign Up</a></span>           
            </section>
        </>
    );
  };

export default LoginForm;