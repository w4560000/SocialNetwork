import signalR from "../../lib/@microsoft/signalr/dist/esm/index.js";
import { MessagePackHubProtocol } from "../../lib/@microsoft/signalr-protocol-msgpack/dist/esm/index.js";
import { Enum, Request, Response, Common } from "../Common/Index.js";

export class ChatHubConnection {
    Connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/ViewerHub")
        .withHubProtocol(new MessagePackHubProtocol())
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connect(ReflashFriendStatusFunc: Function) {
        // Register
        this.Connection.on("ReflashFriendStatus_Receive", ReflashFriendStatusFunc());

        this.Connection.start()
            .then(() => { })
            .catch(err => {
                console.error(err.toString());
                console.log("ChatHubConnection closed.");
                Common.SweetAlertErrorMsg(`ChatHubConnection error: ${err.message}`);
            });
    }
}