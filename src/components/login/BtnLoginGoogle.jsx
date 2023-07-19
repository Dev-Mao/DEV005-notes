// Importa las dependencias necesarias
import { signInWithRedirect, GoogleAuthProvider, getAuth, getRedirectResult } from 'firebase/auth';
import { app } from '../../lib/firebase';
import {FcGoogle} from 'react-icons/fc'
const BtnLoginGoogle = () => {

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    // Define la función signinGoogle
    const handleClick = () => {
    // Iniciar el proceso de autenticación con redirección de Google
        signInWithRedirect(auth, provider)
        .then(() => {
           
        })
        .catch(() => {
        });

        getRedirectResult(auth)
        .then((result) => { 
            const user = result.user;
            localStorage.setItem('currentUser', user.email)
        }).catch(() => {
        
        });

    };
    
    return (
        <div className="container-btn-login-google">
            <button className="btn-login-google" onClick = {handleClick}>
                <FcGoogle className='icon-google'/>
                Login with Google                     
            </button>
        </div>
    );
};

export default BtnLoginGoogle;
