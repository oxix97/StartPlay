import React, { Fragment } from 'react';
import LoginWrapper from './LoginWrapper';
import styled, { createGlobalStyle} from 'styled-components';
import LogoWrapper from './Logo';
import LoginForm from './LoginForm';
import {Main} from './Auth';
import {AuthProvider} from './Auth/AuthContext'
const GlobalStyle = createGlobalStyle`
    #root,html,body{
        background: #E0E3DA;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        
    }
`
const Container=styled.div`
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;


`

function App(){
    return (
        <Fragment>
            <GlobalStyle />
                <Container>
                    <AuthProvider>
                        <LoginWrapper>
                            <LogoWrapper>StartPlayUp</LogoWrapper>
                            <LoginForm/>
                    </LoginWrapper>
                </AuthProvider>
            </Container>
        </Fragment>
    )
}

export default App;