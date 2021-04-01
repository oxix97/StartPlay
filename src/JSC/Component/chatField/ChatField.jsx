import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import Message from './Message'
import MyTextInput from "./MyTextInput";
import Nav from "./Nav";

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
    height:${props => props.width || 600}px;
    width:${props => props.width || 600}px;
    border-radius: 10%;
`;


function ChatField({backgroundColor, height, width, ...props}) {
    const myNickName = "JangSeokChan";
    const [usersName, setUsersName] = useState([]);
    const [chatList, setChatList] = useState([]);
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatList]);

    return (
        <Chat width={height} height={width}>
            <Nav/>
            <TextField className="textField" ref={scrollRef}>
                {chatList.map((i, index) => <Message key={"chat" + index}
                                                     who={i.nickname === myNickName ? "me" : "another"}
                                                     chatObject={i} chatList={chatList}/> )}
            </TextField>
            <MyTextInput nickname={myNickName} chatList={chatList} setChatList={setChatList}/>
        </Chat>
    );
}

export default ChatField;
