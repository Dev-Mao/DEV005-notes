import BtnLoginGoogle from "../components/login/BtnLoginGoogle";
import LoginForm from "../components/login/LoginForm";
import ImgLogin from "../assets/img/login12.jpg";
import { useEffect, useState } from "react";
const Login = () => {   
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
        <section className="section-login">
            <div className="login-container"> 
                <div className="login-form-container">
                    <h1 className="title-login">Welcome back!</h1>  
                    <span className="span-login">Continue with Google or enter your details.</span>
                    <BtnLoginGoogle/>
                    <span className="span-login-lines">or</span>
                    <LoginForm/>                    
                </div>                         
                {windowWidth > 1000 && (
                    <picture className="image-login-container">
                        <img src={ImgLogin} className="image-login" alt="" />
                    </picture>
                )}                
            </div>
        </section>
    );
};

export default Login;