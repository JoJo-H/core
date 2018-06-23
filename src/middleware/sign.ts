module core {
    export function sign(network,code:string): void {
        let routeList = network.request.routeList;
        // let data = routeList2Data(routeList);
        // if (data) {
        //     let m = new core.md5();
        //     let s = m.hex_md5(JSON.stringify(data) + code);
        //     network.addParam("s", s);
        // }
    }
}