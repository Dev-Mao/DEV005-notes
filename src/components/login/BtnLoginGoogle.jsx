// Importa las dependencias necesarias
import { signInWithRedirect, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from '../../lib/firebase';
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
    };
    
    return (
        <div className="container-btn-login-google">
            <button className="btn-login-google" onClick = {handleClick}>
                Login with Google                     
            </button>
        </div>
    );
};

export default BtnLoginGoogle;
