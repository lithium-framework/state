export declare class State<T = any> {
    private _history;
    private _value;
    private _notifier;
    constructor(value?: any);
    get value(): T;
    set value(value: T);
    static init<T = any>(value?: T): State<T>;
    get mutator(): [State<T> & T, (newValue: T) => void];
    subscribe(callback: (newValue: any) => void): void;
    [Symbol.toPrimitive](): T;
}
