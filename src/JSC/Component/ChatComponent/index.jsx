import React, {useContext, useEffect, useRef, useState,memo} from 'react';
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

// 심플피어 예제코드 나중에 가져다 쓸 부분은 선언부랑 p.on('signal',data=>()) 이부분인듯?
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
// const socket = io("localhost:3300");
// const sendMessage = (msg) => {
//     socket.emit('send message', msg)
// };
// const receiveMessage = () => {
//
// }


function Index({backgroundColor, height, width, currentSocket, ...props}) {
    const {user, isAuthenticated, dispatch} = useContext(UserContext);
    const myNickName = user;
    console.log("[debug] : ", user, isAuthenticated);
    const [chatList, setChatList] = useState([]);

    const scrollRef = useRef(null);
    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    };
    currentSocket.on('receive message', (nickname, msg) => {
        console.log("[debug] ChatComponent : socket.on : ", nickname, msg)
        let time = new Date();
        if (!chatList.length || time - chatList[chatList.length - 1].chatTime > 60000) {
            setChatList([...chatList, {
                nickname: nickname,
                textList: [msg],
                chatTime: time
            }]);
        } else {
            let tmp = [...chatList];
            tmp[tmp.length - 1].textList.push();
            tmp.chatTime = time;
            setChatList(tmp);
            console.log(chatList.chatTime);
        }
    });

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
            <MyTextInput nickname={myNickName} chatList={chatList} setChatList={setChatList}
                         currentSocket={currentSocket}/>
        </Chat>
    );
}

export default memo(Index);
