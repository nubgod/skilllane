import { Button, DatePicker, Form, Input, Radio } from "antd"
import { useEffect, useState } from "react"
import API from "../api"
import Header from "../components/Header"
import { IUser } from "../interfaces/user.interface"
import initState from "../utils/init-state"

const Profile = () => {
    const [form] = Form.useForm()

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try{
            const res = await API.getProfile()
            if (res.status === 200) {
                form.setFieldsValue(res.data)
                // form.setFieldsValue({birhDay:new Date(res.data.birhDay)})
            } 

        }catch (error){
            console.log(error)
        }
    }

    const onFinish = async (values: any) => {
        try {
            const res = await API.getCourses()
            if (res.status === 200) {
                console.log('ress ',res)
            }
        } catch (error) { console.log(error) }
    }

    return (
        <div style={{ flexFlow: 'row', justifyContent: 'center', justifyItems: 'center', width: '100vw', height: '100vh', }}>
            <Header editProfile={true} />
            <div style={{display: 'flex', justifyContent:'center'}}>
            <Form form={form} onFinish={onFinish} style={{width: '300px', marginTop: '20px'}}>
                <Form.Item label="Firstname" name="firstName">
                    <Input />
                </Form.Item>
                <Form.Item label="Lastname" name="lastName">
                    <Input />
                </Form.Item>
                <Form.Item label="Nickname" name="nickName">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please input your gender!' }]}
                >
                    <Radio.Group >
                        <Radio value='male'>Male</Radio>
                        <Radio value='female'>Female</Radio>
                    </Radio.Group>
                </Form.Item>
                {/* <Form.Item label="Date of Birth" name="birthDay">
                    <DatePicker />
                </Form.Item> */}
                <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">Edit</Button>
                </Form.Item>
            </Form>
            </div>
        </div>

    )
}

export default Profile

