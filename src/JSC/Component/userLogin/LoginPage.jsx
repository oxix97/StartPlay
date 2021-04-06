import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {UserContext} from '../App'

const UserInformationInput = styled.input`
    display:flex;
    height:40px;
`;

const LoginPage = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(UserContext);

    const onChangeIdHandler = (e) => {
        setId(e.target.value)
    };
    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    };
    const onClickSendButtonHandler = () => {
        dispatch({type:"LOGIN",id,password});
    };

    return (
        <>
            <div>
                <UserInformationInput value={id} onChange={onChangeIdHandler} placeholder="id"/>
                <UserInformationInput  type="password" value={password} onChange={onChangePasswordHandler} placeholder="password"/>
                <button onClick={onClickSendButtonHandler}/>
            </div>
        </>
    )
};

export default LoginPage;
