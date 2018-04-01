
module core {

    /**
     * 返回指定分类的类型单例
     * @param clz 单例化的类型
     * @returns {any} 单例对象
     */
    export function singleton<T>(clz:{new():T}):T {
        let name = clz.name;
        //使用ecma6特性的symbol类型,Symbol.for(key),获取symbol类型，不存在则新建
        let symbol = Symbol.for(name);
        if (!this._singletonMap.hasOwnProperty(symbol)) {
            this._singletonMap[symbol] = new (<any>clz)();
        }
        return <T>this._singletonMap[symbol];
    }

    /**
     * 返回指定分类的类型单例
     * @param clz 单例化的类型
     * @param type 分类名称
     * @returns {any} 单例对象
     */
    export function typeSingleton<T>( clz:{ new(): T; },type:string):T {
        let name = type + clz.name;
        let symbol = Symbol.for(name);
        if (!this._singletonMap.hasOwnProperty(symbol)) {
            this._singletonMap[symbol] = new (<any>type)();
        }
        return <any>this._singletonMap[symbol];
    }
}