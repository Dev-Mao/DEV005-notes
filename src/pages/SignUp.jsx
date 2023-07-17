import SignUpForm from "../components/singup/SingUpForm";
import BtnLoginGoogle from "../components/login/BtnLoginGoogle";
import ImgSignup from "../assets/img/signup.jpg";
import { useEffect, useState } from "react";
const SignUp= () => {    
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
        <>
            <section className="section-signup">
                <div className="signup-container"> 
                    <div className="signup-form-container">
                        <h1 className="title-signup">Create an account</h1>  
                        <span className="span-signup">Continue with Google or enter your details.</span>
                        <BtnLoginGoogle/>
                        <span className="span-signup-lines">or</span>
                        <SignUpForm/>
                    </div>
                    {windowWidth > 834 && (
                    <picture className="image-signup-container">
                        <img src={ImgSignup} className="image-signup" alt="" />
                    </picture>
                )}   
                </div>
            </section>
        </>   
    );
};

export default SignUp;