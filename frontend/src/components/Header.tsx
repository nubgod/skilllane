import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import styled from "styled-components";
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import initState from "../utils/init-state";
import api from "../api";

const { SubMenu } = Menu;

const HeaderBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    background-color: #ffffff;
    height: 50px;
`
const Logo = styled.img`
    object-fit: contain;
    height: 30px;
    vertical-align: middle;
`

interface IProps {
    editProfile?: boolean
}

const handleOnClickProfile = () => {
    window.location.href = '/profile'
}

const logout = async () => {
    try {
        await api.logout()
        window.location.href = '/'
    } catch (error) { console.log(error) }
}

const Header = ({ editProfile }: IProps) => {
    const [current, setCurrent] = useState<string>('');
    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    return (
        <HeaderBox>
            {editProfile ?
                <div style={{ paddingLeft: 20, paddingRight: 20, width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Logo src="https://account.skilllane.com/asset/skilllane-account-logo.png" />
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <SubMenu key="SubMenu" icon={<UserOutlined />}>
                                <Menu.Item onClick={handleOnClickProfile} key="setting:1">Edit Profile</Menu.Item>
                                <Menu.Item onClick={logout} key="setting:2">Logout</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                :
                <Logo src="https://account.skilllane.com/asset/skilllane-account-logo.png" />}

        </HeaderBox>
    )
};

export default Header;
