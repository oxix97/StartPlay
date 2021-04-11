import React, {createContext, useMemo, useReducer} from "react";
import App from './Container';
import {LOGIN} from './Constants/actionTypes';
import {testDB} from "./Common/testDB";


const initialState = {
    user: "",
    isAuthenticated: false,
    getDateFromPeer: []
    // modalPopup:false,
};
//const testDB = [{id: "jsc", password: "1234", nickname: "eclipse"}, {id: "jj", password: "1234", nickname: "jjjj"}];

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            const res = testDB.filter((i) => i.id === action.id && i.password === action.password);
            if (res.length > 0) {
                return {
                    ...state,
                    user: res[0].nickname,
                    isAuthenticated: true
                }
            } else {
                return {
                    ...state,
                    user: "Guest"
                };
            }
        // case CONNECT_PEER:
        //     let isFirstSignal = true;
        //     const newPeer = new Peer({
        //         initiator: state.nickname !== "Guest", // 닉네임이  Guest가 아닐때 true
        //         trickle: false,
        //     });
        //     newPeer.on('error', err => console.log('peer error : ', err));
        //     newPeer.on('signal', data => {
        //         if (isFirstSignal) {
        //             socket.emit(
        //                 'joinCustomer',
        //                 { nickname: state.nickname, mode: 'text', signal: data },
        //                 (serverMsg) => {
        //                     message = serverMsg;
        //                     console.log(message);
        //                     isFirstSignal = false;
        //                 })
        //         }
        //     });
        //     return {...state};
        // case SEND_MESSAGE:
        //     socket.emit('send message',state.nickname, action.text); // 전송버튼 누를때
        //
        //     socket.on('receive message',(msg)=>{
        //
        //     })
        //
        //     return {...state};
        // case "SIMPLE_PEER":
        //     console.log("debug - SIMPLE_PEER");
        //     const p = new Peer({
        //         initiator: location.hash === '#1',
        //         trickle: false
        //     });
        //
        //     p.on('error', err => console.log('error', err))
        //     p.on('signal', data => { // 다른 피어에 데이터를 보내려고 할 때 발생함.
        //         // initatior가  true이면 바로 실행
        //         // initatior가 false이면 데이터를 받고 실행한다.
        //         //console.log('SIGNAL', JSON.stringify(data)) // 데이터를 JSON 문자열로 만든다.
        //         //document.querySelector('#outgoing').textContent = JSON.stringify(data) // outgoing 에다가 json으로 받은
        //         // 값을 문자열로 출력
        //     });
        //
        //     document.querySelector('form').addEventListener('submit', ev => { // form에서 submit일 눌렸을 때
        //         ev.preventDefault(); // 페이지 이동하지 말고
        //         p.signal(JSON.parse(document.querySelector('#incoming').value)) // id가 incoming인 textarea의 값을 받아다가 json으로 변환해서
        //         //
        //     });
        //
        //     p.on('connect', () => {// peer 연결 및 데이터 채널이 준비되면 시작함.
        //         console.log('CONNECT')
        //         p.send('whatever' + Math.random()) // 원격 피어에 데이터를 보냄
        //
        //     });
        //
        //     p.on('data', data => { // 데이터 채널을 통해 원격 피어로부터 메시지를 받음.
        //         console.log('data: ' + data)
        //     });
        //     return {...state};
        default:
            return state;
    }
};
export const UserContext = createContext({
    // user: "",
    // isAuthenticated: false,
    // dispatch: () => {
    // }
});

function store() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {user, isAuthenticated} = state;
    const value = useMemo(() => ({
        user: user,
        isAuthenticated: isAuthenticated,
        dispatch: dispatch
    }), [user, isAuthenticated]);
    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.
    return (
        <UserContext.Provider value={value}>
            <App/>
        </UserContext.Provider>

    )
        ;
}

export default store;
