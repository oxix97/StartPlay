import React, {useEffect,useRef} from 'react';
import Peer from 'simple-peer';
import styled from "styled-components";
navigator.mediaDevices.getUserMedia({video: true, audio: false}, function (err, stream) {
    if (err) return console.error(err)

    const peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    })
    console.log(peer);

    peer.on('signal', function (data) {
        console.log("signal")
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function () {
        console.log("connect button clicked")
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', function () {
        console.log("send button")
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
    })

    peer.on('data', function (data) {
        console.log("data")
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', function (stream) {
        console.log("stream")
        var video = document.createElement('video')
        document.body.appendChild(video)

        video.srcObject = stream
        video.play();
    });
});
const App = () => {
    //const yourId = useRef();

    // useEffect(() => {
        // const getUserMedia = require('getusermedia');

        // navigator.mediaDevices.getUserMedia 최신버전에서 돌아가는 버전의 함수가 따로 있음.
        // https://stackoverflow.com/questions/37315361/chrome-navigator-mediadevices-getusermedia-is-not-a-function

    //     navigator.mediaDevices.getUserMedia({video: true, audio: false}, function (err, stream) {
    //         if (err) return console.error(err)
    //
    //         const peer = new Peer({
    //             initiator: location.hash === '#init',
    //             trickle: false,
    //             stream: stream
    //         })
    //         console.log(peer);
    //
    //         peer.on('signal', function (data) {
    //             console.log("signal")
    //             document.getElementById('yourId').value = JSON.stringify(data)
    //         })
    //
    //         document.getElementById('connect').addEventListener('click', function () {
    //             console.log("connect button clicked")
    //             var otherId = JSON.parse(document.getElementById('otherId').value)
    //             peer.signal(otherId)
    //         })
    //
    //         document.getElementById('send').addEventListener('click', function () {
    //             console.log("send button")
    //             var yourMessage = document.getElementById('yourMessage').value
    //             peer.send(yourMessage)
    //         })
    //
    //         peer.on('data', function (data) {
    //             console.log("data")
    //             document.getElementById('messages').textContent += data + '\n'
    //         })
    //
    //         peer.on('stream', function (stream) {
    //             console.log("stream")
    //             var video = document.createElement('video')
    //             document.body.appendChild(video)
    //
    //             video.srcObject = stream
    //             video.play()
    //         })
    //     })
    // }, []);

    const Test = styled.div`
      display:flex;
      flex-direction: column;
      height:600px;
      align-items: flex-end;
      background-color: white;
      justify-content: space-between;
    `;

    return (
        <Test>
            <label>Your ID:</label><br/>
            <textarea style={{height:"100px"}} id="yourId"></textarea><br/>
            <label>Other ID:</label><br/>
            <textarea style={{height:"100px"}}id="otherId"></textarea>
            <button id="connect">connect</button>
            <br/>

            <label>Enter Message:</label><br/>
            <textarea style={{height:"100px"}} id="yourMessage"></textarea>
            <button id="send">send</button>
            <pre id="messages"></pre>
        </Test>
    );
}

export default App;
