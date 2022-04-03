import { Button, Checkbox, Form, Input } from "antd";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/auth";

import "./styles.css"

const Login: React.FC = (): ReactElement => {
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(values: any){
        const {email, password} = values;
        
        login(email, password).then(()=>{
            navigate('/');
        });
    }

    return(
        <div className='.login-container'>
            <Header />
            <div className='login-container-page'>
                <div className="login-page">
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            label="email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;