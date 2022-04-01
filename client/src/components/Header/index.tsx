import { ReactElement } from "react";
import "./styles.css"

const Header: React.FC = (): ReactElement => {
    return(
        <div className="header">
            <p>Finances</p>
        </div>
    );
}

export default Header;