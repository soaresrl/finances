import { ReactElement } from "react";
import { Link } from 'react-router-dom'
import { useMediaQuery } from "../../utils/useMediaQuery";

import "./styles.css"

const Menu: React.FC = (): ReactElement => {
    const match: boolean = useMediaQuery('(min-width:600px)');

    return(
        match ? 
        (
            <div className="menu">
                <li>Home</li>
                <Link to='/expenses'>Expenses</Link>
                <li>Incomes</li>
                <li>Investiments</li>
            </div>
        ) : (
            <div className="menu">
                <li>Menu</li>
            </div>
        )
    )
}

export default Menu;