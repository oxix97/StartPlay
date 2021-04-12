import React, {useContext, useState} from 'react'
import { useHistory, Link,Redirect} from "react-router-dom";
import styled from 'styled-components'
import {UserContext} from '../store'
import {LOGIN} from '../Constants/actionTypes'

const UserInformationInput = styled.input`
    display:flex;
    height:40px;
`;

const LoginPageContainer = () => {
    const history = useHistory();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const {user, isAuthenticated, dispatch} = useContext(UserContext);
    // console.log("(debug store.js) : ", user, isAuthenticated);

    const onChangeIdHandler = (e) => {
        setId(e.target.value)
    };
    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    };
    const onClickSendButtonHandler = () => {
        dispatch({type: LOGIN, id, password});
        console.log("(debug store.js) : ", "dispatch LOGIN");
        //history.push("/chat");
    };

    return (
        <>
            <div>
                <UserInformationInput value={id} onChange={onChangeIdHandler} placeholder="id"/>
                <UserInformationInput type="password" value={password} onChange={onChangePasswordHandler}
                                      placeholder="password"/>
                <button onClick={onClickSendButtonHandler}>전송{!isAuthenticated ? <Redirect to="/" /> : <Redirect to="/chat" />}</button>
            </div>
        </>
    )
};

export default LoginPageContainer;
