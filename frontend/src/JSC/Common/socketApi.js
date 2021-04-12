export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const socketApi = (type, {currentSocket, message, nickname, chatList, setChatList, socketOnOff = true}, callback = "") => {
    if (socketOnOff) {
        switch (type) {
            case SEND_MESSAGE:
                console.log("[Debug] socketApi in")
                currentSocket.emit(SEND_MESSAGE, nickname, message);
                break;
            case RECEIVE_MESSAGE:
                currentSocket.on(RECEIVE_MESSAGE, (nickname, message) => {
                    console.log("[DEBUG] receive_message on");
                    callback({nickname, inputMessage: message, chatList, setChatList});
                });
                break;
            default:
                return;
        }
    } else {
        switch (type) {
            case RECEIVE_MESSAGE:
                console.log("[DEBUG] receive_message off");
                currentSocket.off(RECEIVE_MESSAGE);
                break;
            default:
                return;
        }
    }
}

