import Login from './pages/Login';
import Wall from './pages/Wall';
import SignUp from './pages/SignUp';
import { app } from './lib/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  const auth = getAuth(app);  

  useEffect(() => {
    const currentPath = window.location.pathname;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/wall');
      } else if (currentPath === '/' || currentPath === '/signup') {
          navigate(currentPath);
      }else{
        navigate('/')
      }
    });
  }, [navigate, auth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/wall" element={<Wall />} />
      </Routes>
    </div>
  );
}

export default App