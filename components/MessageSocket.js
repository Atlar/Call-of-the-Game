import SocketIO from 'socketio-client';

export class MessageSocket {

    constructor() {
        this.connection;
        this.messageHandler;
    }

    connect = (serverURL) => {

        //listen

    }
    setupListener = (handler) => {

        this.messageHandler = handler;

    }


}