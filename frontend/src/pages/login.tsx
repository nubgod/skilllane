import React, { useState } from "react";
import styled from "styled-components"
import { Marginer } from "../components/marginer";
import { Form, Input, Button, Checkbox, message } from 'antd';
import Header from "../components/Header";
import { Link } from "react-router-dom";
import API from "../api";
import localState from "../utils/local-state"


const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ContainerBox = styled.div`
width: 100vw;
height: 100vh;
`;

const LoginCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 500px;
    background-color: pink;
`
const Title = styled.h1`
    font-size: 36px;
    color: #00532A;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
`
const TextLink = styled(Link)`
    color: #00532A;
    text-decoration: none;
    font-size: 14px;
`

const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onFinish = async (values: any) => {
        try {
            setIsLoading(true)
            const res = await API.login(values.username,values.password)
            if(res.status === 200){
                setIsLoading(false)
                localState.save(res.data)
                window.location.href = '/'
            } else {
                setIsLoading(false)
                message.error('ไม่สามารถเข้าสู่ระบบได้ username หรือ password ผิดพลาด')
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    };

    return <div style={{ flexFlow: 'row', justifyContent: 'center', justifyItems: 'center', width: '100vw', height: '100vh' }}>
        <Header />
        <div style={{
            width: '300px',
            margin: '0 auto',
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <div>
                <Title >
                    Login
                </Title>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{ margin: "20px" }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
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

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ display: 'flex', margin: '0 auto', width: '100%', justifyContent: 'center' }} loading={isLoading}>
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center',padding:'2px' }}>
                    <TextLink to="/register">
                        Sign up
                    </TextLink>
                </div>
            </div>

        </div>
    </div>
};

export default Login;
