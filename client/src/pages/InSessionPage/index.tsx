import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

import "./styles.css"

const InSessionPage: React.FC = (): ReactElement => {
    return(
        <div className='in-session-container'>
            <Header />
            <Menu />
            <div className='in-session-page'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default InSessionPage;