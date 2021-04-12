import ChatComponent from '../Component/ChatComponent'
import React, {useContext, useState,memo} from "react";
import styled, {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import thunderstorm from "../image/thunderstorm.jpg";
import LoginPageContainer from "./LoginPageContainer";
import {UserContext} from "../store";
import { Route } from 'react-router-dom';
import TestComponent from './../Component/TestComponent;'
import io from "socket.io-client";

const GlobalStyles = createGlobalStyle`
     ${reset};
     *:focus { outline:none; }
     body{
         //font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         //font-size: 14px;
         //background-color: rgb(178, 199, 217); // 카카오톡 배경
         background-image:url(${thunderstorm})
     }
     img{
      width:20px;
      height:20px;
     }
     html{
      //overflow:hidden;
     }
 `;

const Main = styled.div`
  width:100%;
  height:100%;
  display: flex;
  justify-content: space-between;
`;

const ChatComponentWithStyled = styled(ChatComponent)`
  display:flex;
  justify-items: flex-end;
`;


function ChatContainer() {
    console.log("debug ChatContainer rerender");

    const {user, isAuthenticated, dispatch} = useContext(UserContext);
    return (
        <>
            <GlobalStyles image={thunderstorm}/>
            <Main>
                <Route exact path="/" component={LoginPageContainer}/>
                <Route exact path="/chat">
                    <ChatComponentWithStyled/>
                </Route>
                {/*{!isAuthenticated && <LoginPageContainer/>}*/}
                {/*{isAuthenticated && <Chat/>}*/}
                <Route exact path="/test" component={TestComponent}/>
            </Main>
        </>
    )
        ;
}

export default memo(ChatContainer);
