import Modal from "antd/lib/modal/Modal";
import { ReactElement, useState } from "react";
import { Link } from 'react-router-dom'
import { useMediaQuery } from "../../utils/useMediaQuery";

import "./styles.css"

const Menu: React.FC = (): ReactElement => {
    const match: boolean = useMediaQuery('(min-width:600px)');

    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleModalVisible(){
        setIsModalVisible(true);
    }

    function handleCancel(){
        setIsModalVisible(false);
    }

    return(
        match ? 
        (
            <div className="menu">
                <li>Home</li>
                <Link to='/expenses'>Expenses</Link>
                <Link to='/incomes'>Incomes</Link>
                <li>Investiments</li>
            </div>
        ) : (
            <>
                <div className="menu">
                    <li onClick={handleModalVisible}>Menu</li>
                </div>
                <Modal visible={isModalVisible} footer={[]} onCancel={handleCancel}>
                    <div className="menu-modal">
                        <Link to='/' onClick={handleCancel}>Home</Link>
                        <Link to='/expenses' onClick={handleCancel}>Expenses</Link>
                        <Link to='/incomes' onClick={handleCancel}>Incomes</Link>
                        <Link to='/investments' onClick={handleCancel}>Investments</Link>
                    </div>
                </Modal>
            </>
        )
    )
}

export default Menu;