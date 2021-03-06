import { Button, Dropdown, Menu } from "antd";
import { ReactElement } from "react";
import { AiOutlineBank, AiOutlineMenuUnfold } from 'react-icons/ai';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const Header: React.FC = (): ReactElement => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout () {
    logout();

    navigate('/');
  }

  const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/user/settings">User settings</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </Menu.Item>
      </Menu>
    );

  return(
      <div className="header">
          <AiOutlineMenuUnfold />
          <AiOutlineBank title="Financial Dashboard" />
          <Dropdown overlay={menu} trigger={['click']}>
              <RiAccountCircleLine className="account-dropdown" />
          </Dropdown>
      </div>
  );
}

export default Header;