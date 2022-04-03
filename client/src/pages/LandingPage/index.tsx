import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./styles.css";

const LandingPage: React.FC = (): ReactElement => {
    return(
        <div className='landing-page'>
            <Header />
            <div className='page'>
                <div className="login-container"> 
                    <Link to='/auth/login'>Login here</Link>
                </div>
                <div className="signup-container"> 
                    <p>Don't have an account? Create here</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage;