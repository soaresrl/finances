import { ReactElement } from "react";

import "./styles.css";

const Footer: React.FC = (): ReactElement => {
    return(
        <div className="footer">
            <div>
                <p>Finances Dashboard</p>
            </div>

            <div>
                <p>Developed by: soaresrl</p>
            </div>
        </div>
    )
}


export default Footer;