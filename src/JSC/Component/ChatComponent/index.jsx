import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import Message from './Message'
import MyTextInput from "./MyTextInput";
import Nav from "./Nav";
import {UserContext} from "../../store";
// import SimplePeer from 'simple-peer'
// import io from 'socket'

const TextField = styled.div`
  display:flex;
  padding:10px;
  border: rgb(0, 0, 0);
  flex-direction: column;
  overflow-y: scroll;
  width:auto;
  height:inherit;
  background-color: white;
  
  &::-webkit-scrollbar{
    width: 100%;
    background-color: black;
  }
  
`;

const Chat = styled.div`
    display:flex;
    flex-direction: column;
    height:${props => props.width || 600}px;
    width:${props => props.width || 600}px;
    border-radius: 10%;
`;


// const p = new SimplePeer({
//     initiator: location.hash === '#1',
//     trickle: false
// });
//
// p.on('error', err => console.log('error', err));
//
// p.on('signal', data => {
//     console.log('SIGNAL', JSON.stringify(data));
//     document.querySelector('#outgoing').textContent = JSON.stringify(data)
// });
//
// document.querySelector('form').addEventListener('submit', ev => {
//     ev.preventDefault();
//     p.signal(JSON.parse(document.querySelector('#incoming').value))
// });
//
// p.on('connect', () => {
//     p.send('whatever' + Math.random());
// });
//
// p.on('data', data => {
//     console.log('data: ' + data)
// });

function Index({backgroundColor, height, width, ...props}) {
    const {user, isAuthenticated, dispatch} = useContext(UserContext);
    const myNickName = user;
    const [chatList, setChatList] = useState([]);
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    };

    useEffect(() => {
        console.log(chatList);
        scrollToBottom();
    }, [chatList]);

    return (
        <Chat width={height} height={width}>
            <Nav/>
            <TextField className="textField" ref={scrollRef}>
                {chatList.map((i, index) => <Message key={"chat" + index}
                                                     who={i.nickname === myNickName ? "me" : "another"}
                                                     chatObject={i} chatList={chatList}/>)}
            </TextField>
            <MyTextInput nickname={myNickName} chatList={chatList} setChatList={setChatList}/>
        </Chat>
    );
}

export default Index;