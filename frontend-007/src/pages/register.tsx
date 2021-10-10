import React, { useState } from "react";
import styled from "styled-components"
import { Marginer } from "../components/marginer";
import { Form, Input, Button, Checkbox, Radio, DatePicker } from 'antd';
import Header from "../components/Header";
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
const Title = styled.div`
    font-size: 18px;
    color: blue;
`

const Register = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onFinish = (values: any) => {
        try{
            console.log('Success:', values);
            setIsLoading(true)

        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }

    };


    return <div style={{flexFlow:'row',justifyContent:'center',justifyItems:'center',width:'100vw',height:'100vh'}}>
        <Header/>
        <div style={{
            width: '500px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent:'center', 
            }}>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                style={{margin: "20px"}}
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

                <Form.Item
                    label="Re-Password"
                    name="Re-Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    label="Firstname"
                    name="firstname"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Lastname"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nickname"
                    name="nickName"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date of Birth"
                    name="birthday"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Radio.Group >
                        <Radio value='male'>Male</Radio>
                        <Radio value='female'>Female</Radio>
                        <Radio value='other'>Other</Radio>
                    </Radio.Group>
                </Form.Item>


                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        style={{display: 'flex', margin: '0 auto', width: '100%', justifyContent: 'center'}} loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
};

export default Register;
