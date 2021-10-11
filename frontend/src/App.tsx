import React, { useState, useEffect, useCallback } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import renderRoutes from "./components/renderRoutes";
import routes from "./routes";
import routesAuth from "./routes/auth"
import Login from "./pages/login";
import styled from "styled-components";
import Register from "./pages/register";
import Courses from "./pages/course";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`

`;

const authPath = "/login";

const Container = ({ children }: any) => {
  return (
    <AppContainer>
      <BoxContainer>{children}</BoxContainer>
    </AppContainer>
  );
};

function App(props: any) {
  return (
    <BrowserRouter>
      <Container>{renderRoutes(routes, props.authed, '/')}</Container>
    </BrowserRouter>
  );
}

const LoginApp = () => {
  return (
    <BrowserRouter>
    <Container>
      {renderRoutes(routesAuth, false, '/login')}
    </Container>
  </BrowserRouter>
  )
}


export { LoginApp };

export default App;
