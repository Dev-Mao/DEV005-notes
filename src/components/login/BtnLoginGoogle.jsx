// Importa las dependencias necesarias
import { signInWithRedirect, GoogleAuthProvider, getAuth, getRedirectResult } from 'firebase/auth';
import { app } from '../../lib/firebase';
import {FcGoogle} from 'react-icons/fc'
const BtnLoginGoogle = () => {

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    // Define la función signinGoogle
    const handleClick = () => {
        signInWithRedirect(auth, provider)
        .then(() => {
        })
        .catch(() => {
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
