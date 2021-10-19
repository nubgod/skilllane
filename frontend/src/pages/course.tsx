import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, DatePicker, Modal } from 'antd';
import API from "../api";
import { ICourse } from "../interfaces/course.interface";
import { useDebounce } from "../utils/debounce";
import Header from "../components/Header";
import initState from "../utils/init-state";
import { Container } from "../components/Layout";
import styled from "styled-components";

interface ICardProps {
    data?: ICourse
}

const Courses = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [courses, setCourses] = useState<ICourse[]>([])

    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(search, 1000);
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [date, setDate] = useState({
        startDate: '',
        endDate: ''
    })
    const [role, setRole] = useState<string>()

    const [form] = Form.useForm()

    const searching = async () => {
        setIsSearching(true);
        await fetchCourse(debouncedSearchTerm)
        setIsSearching(false);
    }

    useEffect(() => {
        const loadState = async () => {
            const { role }: any = await initState()
            if (role) {
                setRole(role)
            }
        }
        loadState()
    }, [])

    useEffect(() => {
        searching()
    }, [debouncedSearchTerm])

    useEffect(() => {
        fetchCourse()
    }, [date])


    const fetchCourse = async (search: any = '') => {
        try {
            const res = await API.getCourses(search ?? '', date.startDate, date.endDate)
            if (res.status === 200) {
                setCourses(res.data)
                setIsSearching(false);
            }
        } catch (error) { console.log(error) }
    }

    const handleOnSearch = (e: any) => {
        setSearch(e.target.value)
    }

    const handleOnCreateCourse = async (values: any) => {
        try {
            setIsLoading(true)
            const res = await API.createCourse({
                ...values,
                startDate: values.date[0],
                endDate: values.date[1]
            })
            if (res.status === 201) {
                form.resetFields()
                fetchCourse()
            }
            setIsLoading(false)
            setIsVisible(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setIsVisible(false)
        }
    }

    const handleOnChangeDate = (date: any) => {
        if (date) {
            setDate({
                startDate: date[0],
                endDate: date[1]
            })
        } else {
            setDate({
                startDate: '',
                endDate: ''
            })
        }
    }

    const TextContainer = styled.div<any>`
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${props => props.color ? props.color : 'black'};
        ${props => props.bold && 'font-weight: bold;'}
    `;

    const Card = ({ data }: ICardProps) => {
        return (
            <Row style={{ minHeight: '200px', border: '1px solid #E5E5E5', padding: '20px', marginBottom: 10, height: '100%', wordWrap: 'break-word' }} gutter={16}>
                <Col xs={24} lg={24}>
                    <img style={{ width: '100%', marginBottom: '20px' }} src="https://resource.skilllane.com/courses/highlight_imgs/000/001/659/large/660x390_%282%29_1628136074.jpg" />
                </Col>
                <Col xs={16} lg={24}>
                    <TextContainer bold color="#00532a">
                        {data?.name}
                    </TextContainer>
                    <TextContainer style={{ marginTop: '10px' }}>
                        {data?.description}
                    </TextContainer>
                    <div style={{ marginTop: 10 }}>
                        <span style={{ color: '#00532a' }}>ผู้สอน</span>
                        <span style={{ marginLeft: '5px' }}>{`${data?.user?.firstName} ${data?.user?.lastName}`}</span>
                    </div>
                </Col>
            </Row>
        )
    }

    return (
        <Container>
            <Header editProfile={true} />
            <div style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', justifyItems: 'center', width: '100vw', padding: '20px' }}>
                <Row gutter={[16, 16]}>
                    <Col sm={24} md={8} style={{ width: '100%' }}>
                        <DatePicker.RangePicker style={{ width: '100%' }} onChange={handleOnChangeDate} />
                    </Col>
                    <Col sm={24} md={16} style={{ width: '100%' }}>
                        <Input.Search onChange={handleOnSearch} />
                    </Col>
                    {role !== 'student' &&
                        <Col md={24} xs={24} style={{ justifyContent: 'end', display: 'flex' }}>
                            <Button type="primary" onClick={() => setIsVisible(true)}>Create Course</Button>
                        </Col>
                    }
                </Row>

                <Row gutter={24} style={{ marginTop: '20px', width: '100%', marginLeft: '0', marginRight: '0' }}>
                    {courses.map((data, index) => (
                        <Col sm={24} md={8} lg={6} style={{ width: '100%', marginBottom: 10 }} key={index}>
                            <Card data={data} />
                        </Col>
                    ))}
                </Row>
            </div>

            <Modal destroyOnClose visible={isVisible} footer={false} onCancel={() => { setIsVisible(false); form.resetFields() }} centered>
                <h3>Create Course</h3>
                <Form layout="vertical" style={{ paddingTop: 20 }} form={form} onFinish={handleOnCreateCourse}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please input category!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please input subject!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input date!' }]}>
                        <DatePicker.RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={isLoading}>Create</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Container>
    )
};

export default Courses;
