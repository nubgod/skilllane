import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import styled from "styled-components";
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import initState from "../utils/init-state";
import api from "../api";
import localState from "../utils/local-state";
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;

const HeaderBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    background-color: #ffffff;
    height: 50px;
    width: 100%;
`
const Logo = styled.img`
    object-fit: contain;
    height: 30px;
    vertical-align: middle;
`

interface IProps {
    editProfile?: boolean
}



const Header = ({ editProfile }: IProps) => {
    let history = useHistory();
    const [current, setCurrent] = useState<string>('');
    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    const handleOnClickProfile = () => {
        history.push("/profile");
    }

    const logout = async () => {
        try {
            await api.logout()
            localState.clean();
            window.location.href = '/'
        } catch (error) { console.log(error) }
    }

    const gotoHomePage = () => {
        window.location.href = '/'
    }

    return (
        <HeaderBox>
            {editProfile ?
                <div style={{ paddingLeft: 20, paddingRight: 20, width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Logo onClick={gotoHomePage} src="https://account.skilllane.com/asset/skilllane-account-logo.png" />
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{ flex: 1, justifyContent: 'end' }}>
                        <SubMenu key="SubMenu" icon={<UserOutlined />} title="Profile">
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
