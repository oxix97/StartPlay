import './App.css'
import {
    Home,
    waitingRoom,
    Mafia,
    YachtDice,
    Yutnori,
    CreateRoom,
    CreateButton
} from './WebPage'
import {BrowserRouter, Route, Router} from 'react-router-dom';

const App = () => {
    return (
        <>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/waitingRoom"} component={waitingRoom}/>
            <Route path={"/Mafia"} component={Mafia}/>
            <Route path={"/YachtDice"} component={YachtDice}/>
            <Route path={"/Yutnori"} component={Yutnori}/>
            {/*<Route path={"/CreateRoom"} component={CreateRoom}/>*/}
        </>
    );
};

export default App;