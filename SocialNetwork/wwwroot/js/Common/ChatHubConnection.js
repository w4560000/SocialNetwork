//import { HubConnectionBuilder } from "../../lib/@microsoft/signalr/dist/esm/HubConnectionBuilder.js";
//import { MessagePackHubProtocol } from "../../lib/@microsoft/signalr-protocol-msgpack/dist/esm/MessagePackHubProtocol.js";
import { Common } from "../Common/Index.js";
var ChatHubConnection = /** @class */ (function () {
    function ChatHubConnection() {
        this.Connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            //.withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }
    ChatHubConnection.prototype.connect = function (ReflashFriendStatusFunc) {
        // Register
        this.Connection.on("ReflashFriendStatus_Receive", function (friend) {
            ReflashFriendStatusFunc(friend);
        });
        this.Connection.start()
            .then(function () { })
            .catch(function (err) {
            console.error(err.toString());
            console.log("ChatHubConnection closed.");
            Common.SweetAlertErrorMsg("ChatHubConnection error: ".concat(err.message));
        });
    };
    return ChatHubConnection;
}());
export { ChatHubConnection };
