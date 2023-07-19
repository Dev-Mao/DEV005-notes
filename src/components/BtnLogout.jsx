import { signOut, getAuth } from 'firebase/auth';
import { app } from '../lib/firebase.js';
import { useNavigate } from 'react-router-dom';
const BtnLogout = () => {

    
    const auth = getAuth(app);
    const navigate = useNavigate();

    // Define la función signinGoogle
    const handleClick = () => {        
        signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch(() => {
        });
    };
    
    return (
        <div className="container-btn-logout">
            <button className="btn-logout" onClick = {handleClick}>
                Logout                     
            </button>
        </div>
    );
};

export default BtnLogout;



