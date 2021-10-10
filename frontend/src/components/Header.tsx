import React, { useState } from "react";
import styled from "styled-components";

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

const Header = () => {
    return (
        <HeaderBox>
            <Logo src="https://account.skilllane.com/asset/skilllane-account-logo.png" />
        </HeaderBox>
    )
};

export default Header;
