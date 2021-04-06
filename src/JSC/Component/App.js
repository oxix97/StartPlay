import ChatField from './chatField/ChatField'
import React, {createContext, useMemo, useReducer} from "react";
import styled, {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import thunderstorm from "../image/thunderstorm.jpg";
import LoginPage from "./userLogin/LoginPage";

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

const Chat = styled(ChatField)`
  display:flex;
  justify-items: flex-end;
`;

const initialState = {
    user: "",
    isAuthenticated: false,
    modalPopup:false,
};
const testDB = [{id: "jsc", password: "1234", nickname: "eclipse"}];

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            const res = testDB.filter((i)=>i.id===action.id && i.password===action.password);
            if (res.length > 0){
                return {
                    ...state,
                    user: res[0].nickname,
                    isAuthenticated: true
                }
            }
            else{
                return{
                    ...state
                }
            }
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

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {user, isAuthenticated} = state;
    const value = useMemo(() => ({user, isAuthenticated, dispatch}), [user,isAuthenticated]);
    return (
        <>
            <GlobalStyles image={thunderstorm}/>
            <Main>
                <UserContext.Provider value={value}>
                    {!isAuthenticated && <LoginPage/>}
                    {isAuthenticated && <Chat/>}
                </UserContext.Provider>
            </Main>
        </>
    )
        ;
}

export default App;
