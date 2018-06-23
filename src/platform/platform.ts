
module core {

    export interface IPlatform {
        login(): Promise<any>;
        payment(payData:any): Promise<any>;
        share(shareData:any): Promise<any>;
    }
    var platformMap : {shortcur : string[],type:{new():IPlatform}}[] = [];
    export function platform(name:string) {
        return (ctor) => {
            let shortcur = name.split(/ +/gi);
            platformMap.push({
                shortcur,
                type:ctor
            });
            return ctor;
        }
    }

    export interface IPlatformInfo {
        name: string;
        version: string;
    }
    var platformInfo: IPlatformInfo = null;
    export function setPlatformInfo(info: IPlatformInfo) {
        platformInfo = info;
    }
    export function getPlatformInfo() {
        return platformInfo;
    }

    var platformInst = {};
    var currentPlatform : IPlatform = null;
    export function getPlatform():IPlatform {
        if(currentPlatform) {
            return currentPlatform;
        }
        let type = platformInfo.name;
        if(platformInst.hasOwnProperty(type)){
            return platformInst[type];
        }
        for(let i = 0 ; i < platformMap.length; i ++) {
            let item = platformMap[i];
            if(item.shortcur.indexOf(type) > -1) {
                platformInst[type] = new item.type();
                return platformInst[type];
            }
        }
        return nonePlatform;
    }

    export function setPlatform(type: IPlatform) {
        currentPlatform = type;
    }

    export class NonePlatform implements IPlatform {
        login(): Promise<any> {
            return new Promise<any>((resolve) => {

            });
        }
        payment(payData: any): Promise<any> {
            return new Promise<any>((resolve) => {

            });
        }
        share(shareData: any): Promise<any> {
            return new Promise<any>((resolve) => {

            });
        }
    }
    var nonePlatform = new NonePlatform();


    export function wxPromisify(fn) {
        return (obj = {}) => {
            return new Promise((resolve, reject) => {
                fn({
                    ...obj,
                    success: resolve,
                    fail: reject
                });
            })
        }
    }
    @platform('wxgame')
    export class WxPlatform implements IPlatform {
        private async getAccount() {
            let loginInfo:any = await wxPromisify(window['wx'].login)();
            let userInfo:any = await wxPromisify(window['wx'].getUserInfo)();
            return {
                code: loginInfo.code,
                rawData: userInfo.rawData,
                signature: userInfo.signature,
                encryptedData: userInfo.encryptedData,
                iv: userInfo.iv  
            };
        }

        login(): Promise<any> {
            return new Promise((resolve) => {
                resolve(this.getAccount());
            });
        }

        payment(payData: any): Promise<any> {
            return new Promise((resolve) => {

            });
        }

        share(shareData: any): Promise<any> {
            return new Promise((resolve) => {

            });
        }
    }

    @platform("bj bearjoy")
    export class BJPlatform implements IPlatform {
        private async getAccount() {
            let uName = core.localStorage.getString('uName'); 
            let uPass = core.localStorage.getString('uPass');
            if (!uName || !uPass) {
                // let data = await core.net.create('http://u.bearjoy.com/quickReg.php').send();
                // uName = data.data.e;
                // uPass = data.data.p;
                // core.localStorage.setString('uName', uName);
                // core.localStorage.setString('uPass', uPass);
            }
            return {
                uName, uPass
            }
        }

        login(): Promise<any> {
            return new Promise<any>((resolve) => {
                let account = this.getAccount();
                resolve(account);
            })
        }

        payment(payData: any): Promise<any> {
            return new Promise((resolve) => {
                
            });;
        }

        share(shareData: any): Promise<any> {
           return new Promise((resolve) => {
                
            });;
        }
    }
}