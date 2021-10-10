import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { Marginer } from "../components/marginer";
import { Form, Input, Button, Checkbox, Row, Col, Select } from 'antd';
import Header from "../components/Header";
import API from "../api";

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
    color: var(--primaryMainColor);
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
`
const TextLink = styled.a

const { Option } = Select

interface ICourse {
    id: string
    name: string
    subject: string
    description?: string
    category: string
    image: string
    startDate: string
    endDate: string
    createdBy: string
    createdAt: Date
}

interface ICardProps {
    data?: ICourse
}


const Courses = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>()
    const [courses, setCourses] = useState<ICourse[]>([])
    console.log('test')

    useEffect(() => {
        fetchCourse()
    }, [])
    useEffect(() => {
        fetchCourse()
    }, [search])

    const fetchCourse = async () => {
        try {
            const res = await API.getCourses(search ?? '')
            if (res.status === 200) {
                setCourses(res.data)
            }
        } catch (error) { console.log(error) }
    }

    const handleOnSearch = (e: any) => {
        setSearch(e.target.value)
    }

    const Card = ({ data }: ICardProps) => {
        return (
            <Row style={{ minHeight: '200px', border: '1px solid black', padding: '20px' }} gutter={16}>
                <Col xs={8} lg={24}>
                    <img style={{ width: '100%', height: '100px' }} src="https://resource.skilllane.com/courses/highlight_imgs/000/001/659/large/660x390_%282%29_1628136074.jpg" />
                </Col>
                <Col xs={16} lg={24} style={{ marginTop: '20px' }}>
                    <div style={{ fontWeight: 'bold', color: '#00532a' }}>
                        Organization Structure Design การออกแบบโครงสร้างองค์กร
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Col xs={0} lg={24}>
                            <img style={{ borderRadius: '50%', width: '20px', height: '20px' }} src="https://resource.skilllane.com/users/images/001/705/011/mlist/IMG_5215_%281%29.jpg?1625546397" />
                        </Col>
                        <span style={{ marginLeft: '5px' }}>
                            ผศ. ดร.พลรพี ทุมมาพันธ์
                        </span>
                    </div>                        <div style={{ marginTop: '10px' }}>
                        <Col xs={0} lg={24}>
                            <img style={{ borderRadius: '50%', width: '20px', height: '20px' }} src="https://resource.skilllane.com/users/images/001/705/011/mlist/IMG_5215_%281%29.jpg?1625546397" />
                        </Col>
                        <span style={{ marginLeft: '5px' }}>
                            ผศ. ดร.พลรพี ทุมมาพันธ์
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span style={{ color: '#00532a' }}>1500 บาท</span>
                        <span style={{ marginLeft: '5px' }}>ไม่เก็บหน่วยกิจ</span>
                    </div>
                </Col>
            </Row>
        )
    }

    return <div style={{ flexFlow: 'row', justifyContent: 'center', justifyItems: 'center', width: '100vw', height: '100vh' }}>
        <Row>
            <Col sm={24} lg={8}>
                <Select style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Col>
            <Col sm={24} lg={16}>
                <Input onChange={handleOnSearch} />
            </Col>
        </Row>

        <Row gutter={24} justify="center" style={{ marginTop: '20px' }}>
            {courses.map((data, index) => (
                <Col sm={24} lg={4} style={{ width: '100%' }} key={index}>
                    <Card data={data} />
                </Col>
            ))}
        </Row>
    </div>
};

export default Courses;
