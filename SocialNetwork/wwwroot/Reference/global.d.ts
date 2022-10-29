import swal from 'sweetalert2';
import $ from 'jquery';
import 'jquery-ui';
import SignalR from '@microsoft/signalr';

// 自定義 signalR.protocols.msgpack.MessagePackHubProtocol
//export namespace SignalR {
//    const HubConnectionBuilder: typeof signalRModule.HubConnectionBuilder;
//    namespace protocols {
//        namespace msgpack {
//            const MessagePackHubProtocol: typeof messagePackHubProtocol.MessagePackHubProtocol;
//        }
//    }
//}

declare global {
    const Swal: typeof swal;
    const signalR: typeof SignalR;
    //const signalrProtocolMsgpack: typeof SignalrProtocolMsgpack;
}

//export namespace SignalR1 {
//    namespace protocols {
//        namespace msgpack {
//            const MessagePackHubProtocol: typeof messagePackHubProtocol.MessagePackHubProtocol;
//        }
//    }
//}
//export default swal;
//export as namespace swal;