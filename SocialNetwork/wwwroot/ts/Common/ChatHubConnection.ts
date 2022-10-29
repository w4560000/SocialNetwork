//import { HubConnectionBuilder } from "../../lib/@microsoft/signalr/dist/esm/HubConnectionBuilder.js";
//import { MessagePackHubProtocol } from "../../lib/@microsoft/signalr-protocol-msgpack/dist/esm/MessagePackHubProtocol.js";
import { Enum, Request, Response, Common, ViewModel } from "../Common/Index.js";

export class ChatHubConnection {
    Connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        //.withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connect(ReflashFriendStatusFunc: Function) {
        // Register
        this.Connection.on("ReflashFriendStatus_Receive", (friend: Response.GetFriendListResViewModel) => {
            ReflashFriendStatusFunc(friend);
        });

        this.Connection.start()
            .then(() => { })
            .catch(err => {
                console.error(err.toString());
                console.log("ChatHubConnection closed.");
                Common.SweetAlertErrorMsg(`ChatHubConnection error: ${err.message}`);
            });
    }
}