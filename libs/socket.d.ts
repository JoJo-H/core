declare module egret {
    /**
     * @private
     */
    class HTML5WebSocket implements ISocket {
        private socket;
        constructor();
        private onConnect;
        private onClose;
        private onSocketData;
        private onError;
        private thisObject;
        addCallBacks(onConnect: Function, onClose: Function, onSocketData: Function, onError: Function, thisObject: any): void;
        connect(host: string, port: number): void;
        connectByUrl(url: string): void;
        private _bindEvent();
        send(message: any): void;
        close(): void;
    }
}
declare module egret {
    /**
     * @private
     */
    interface ISocket {
        /**
         * 连接
         * @method egret.ISocket#connect
         */
        connect(host: string, port: number): void;
        /**
         * 连接
         * @method egret.ISocket#connect
         */
        connectByUrl(url: string): void;
        addCallBacks(onConnect: Function, onClose: Function, onSocketData: Function, onError: Function, thisObject: any): void;
        send(message: any): void;
        close(): void;
    }
}
declare module egret {
    /**
     * @private
     */
    class NativeSocket implements ISocket {
        private socket;
        constructor();
        private onConnect;
        private onClose;
        private onSocketData;
        private onError;
        private thisObject;
        addCallBacks(onConnect: Function, onClose: Function, onSocketData: Function, onError: Function, thisObject: any): void;
        connect(host: string, port: number): void;
        connectByUrl(url: string): void;
        private _bindEvent();
        send(message: any): void;
        close(): void;
    }
}
declare module egret {
    /**
     * @class egret.WebSocket
     * @classdesc
     * egret.WebSocket 类启用代码以建立传输控制协议 (TCP) 套接字连接，用于发送和接收字符串或二进制数据。
     * 要使用 egret.WebSocket 类的方法，请先使用构造函数 new egret.WebSocket 创建一个 egret.WebSocket 对象。
     * 套接字以异步方式传输和接收数据。
     * @event egret.Event.CONNECT 连接服务器成功。
     * @event egret.ProgressEvent.SOCKET_DATA 接收服务器数据。
     * @event egret.Event.CLOSE 在服务器关闭连接时调度。
     * @event egret.ProgressEvent.IO_ERROR 在出现输入/输出错误并导致发送或加载操作失败时调度。。
     * @see http://edn.egret.com/cn/index.php/article/index/id/164 WebSocket
     * @includeExample extension/socket/WebSocket.ts
     */
    class WebSocket extends egret.EventDispatcher {
        /**
         * 以字符串格式发送和接收数据
         * @constant {string} egret.WebSocket.TYPE_STRING
         */
        static TYPE_STRING: string;
        /**
         * 以二进制格式发送和接收数据
         * @constant {string} egret.WebSocket.TYPE_BINARY
         */
        static TYPE_BINARY: string;
        socket: ISocket;
        private _writeMessage;
        private _readMessage;
        private _connected;
        /**
         * 创建一个 egret.WebSocket 对象。
         * 参数为预留参数，现版本暂不处理，连接地址和端口号在 connect 函数中传入。
         * @param host 要连接到的主机的名称或 IP 地址
         * @param port 要连接到的端口号
         */
        constructor(host?: string, port?: number);
        /**
         * 将套接字连接到指定的主机和端口
         * @param host 要连接到的主机的名称或 IP 地址
         * @param port 要连接到的端口号
         * @method egret.WebSocket#connect
         */
        connect(host: string, port: number): void;
        /**
         * 根据提供的url连接
         * @param url 全地址。如ws://echo.websocket.org:80
         */
        connectByUrl(url: string): void;
        /**
         * 关闭套接字
         * @method egret.WebSocket#close
         */
        close(): void;
        private onConnect();
        private onClose();
        private onError();
        private onSocketData(message);
        /**
         * 对套接字输出缓冲区中积累的所有数据进行刷新
         * @method egret.WebSocket#flush
         */
        flush(): void;
        private _isReadySend;
        /**
         * 将字符串数据写入套接字
         * @param message 要写入套接字的字符串
         * @method egret.WebSocket#writeUTF
         */
        writeUTF(message: string): void;
        /**
         * 从套接字读取一个 UTF-8 字符串
         * @returns {string}
         * @method egret.WebSocket#readUTF
         */
        readUTF(): string;
        private _readByte;
        private _writeByte;
        private _bytesWrite;
        /**
         * 从指定的字节数组写入一系列字节。写入操作从 offset 指定的位置开始。
         * 如果省略了 length 参数，则默认长度 0 将导致该方法从 offset 开始写入整个缓冲区。
         * 如果还省略了 offset 参数，则写入整个缓冲区。
         * @param bytes 要从中读取数据的 ByteArray 对象
         * @param offset ByteArray 对象中从零开始的偏移量，应由此开始执行数据写入
         * @param length 要写入的字节数。默认值 0 导致从 offset 参数指定的值开始写入整个缓冲区
         * @method egret.WebSocket#writeBytes
         */
        writeBytes(bytes: ByteArray, offset?: number, length?: number): void;
        /**
         * 从套接字读取 length 参数指定的数据字节数。从 offset 所表示的位置开始，将这些字节读入指定的字节数组
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset 数据读取的偏移量应从该字节数组中开始
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @method egret.WebSocket#readBytes
         */
        readBytes(bytes: ByteArray, offset?: number, length?: number): void;
        /**
         * 表示此 Socket 对象目前是否已连接
         */
        connected: boolean;
        private _type;
        /**
         * 发送和接收数据的格式，默认是字符串格式
         */
        type: string;
    }
}
/**
 * Created by yang on 16/11/17.
 */
declare class WebSocketClass {
    constructor();
    connected: any;
    private _callbacks;
    private reqId;
    on(event: any, fn: any): this;
    once(event: any, fn: any): this;
    off(event: any, fn: any): this;
    emit(event: any): this;
    listeners(event: any): any;
    hasListeners(event: any): boolean;
    private socket;
    private initCallback;
    private protoVersion;
    init(params: any, cb: any): void;
    private initWebSocket(url, cb);
    close(): void;
    private handlers;
    private heartbeatInterval;
    private heartbeatTimeoutId;
    private heartbeatId;
    private heartbeatTimeout;
    private heartbeatTimeoutCb;
    private processPackage(msg);
    private heartbeat(data);
    private onData(data);
    private onKick(data);
    private processMessage(pomelo, msg);
    private sendMessage(reqId, route, msg);
    private send(packet);
    private encode(reqId, route, msg);
    request(route: any, msg: any, cb: any): void;
    disconnect(): void;
    dispose(): void;
    static decode(data: any): {
        'body': Uint8Array;
        'type': number;
    };
    private static deCompose(msg);
}
declare class protobuf {
    static TYPE_HANDSHAKE: number;
    static TYPE_HANDSHAKE_ACK: number;
    static TYPE_HEARTBEAT: number;
    static TYPE_DATA: number;
    static TYPE_KICK: number;
    static strencode(str: any): Uint8Array;
    static strdecode(buffer: any): any;
    static encode(type: any, body: any): Uint8Array;
    static decode(buffer: any): {
        'body': Uint8Array;
        'type': number;
    };
    static copyArray(dest: any, doffset: any, src: any, soffset: any, length: any): void;
}
declare class Message {
    static TYPE_REQUEST: number;
    static TYPE_NOTIFY: number;
    static TYPE_RESPONSE: number;
    static TYPE_PUSH: number;
    static encode(id: any, type: any, compressRoute: any, route: any, msg: any): Uint8Array;
    static decode(buffer: any): {
        'body': Uint8Array;
        'type': number;
    };
    static msgHasId(type: any): boolean;
    static caculateMsgIdBytes: (id: any) => number;
    static encodeMsgBody: (msg: any, buffer: any, offset: any) => any;
}
/**
 * Created by yang on 16/11/17.
 */
declare module andes {
    module socket {
        interface ISocketCallback {
            analysis(data: any): void;
            onClose?(): void;
            onConnect?(): void;
            onAdd?(data: any): void;
            onError?(errData: any, t?: any): void;
            onEnterError?(errData: any): void;
            onHeartBeat?(data: any): void;
        }
        interface ISetting {
            Callback: any;
            getCallback(): ISocketCallback;
        }
        class Setting implements ISetting {
            private _setting;
            Callback: string;
            init(setting: ISetting): void;
            getCallback(): ISocketCallback;
            static init(setting: ISetting): void;
        }
        function getSetting(): ISetting;
        class GameWebSocket {
            enable: boolean;
            needReconnect: boolean;
            websocket: WebSocketClass;
            isConnecting: boolean;
            name: string;
            private _tickId;
            private _heart;
            tick(): void;
            private runTick();
            private _conf;
            init(conf?: any): void;
            private initCallback();
            close(): void;
            private enter();
            connected: any;
            reconnect(): void;
            private setDisconnect();
            disconnect(): void;
            request(route: any, msg?: any, cb?: any): void;
            private static socketList;
            private static _initialized;
            private static initialize();
            static get(type?: any): GameWebSocket;
            static run(conf: any, type?: any): void;
        }
    }
}
