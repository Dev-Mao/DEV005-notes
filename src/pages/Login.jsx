import BtnLoginGoogle from "../components/login/BtnLoginGoogle";
import LoginForm from "../components/login/LoginForm";
const Login = () => {    

    return (
        <section className="section-login">
            <div className="login-container">            
                <LoginForm/>
                <BtnLoginGoogle/>
            </div>
        </section>
    );
};

export default Login;