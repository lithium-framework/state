import { Observable } from "@microsoft/fast-element";
export class State {
    _history = [];
    _value = null;
    _notifier = Observable.getNotifier(this);
    constructor(value = null) {
        this._value = value;
    }
    get value() {
        Observable.track(this, 'value');
        return this._value;
    }
    ;
    set value(value) {
        this._value = value;
        this._history = [this._value, ...this._history.reverse()].reduce((results, value) => {
            if (results.length > 10) {
                results.push(value);
            }
            ;
            return results;
        }, []).reverse();
        Observable.notify(this, 'value');
    }
    static init(value = null) {
        return new State(value);
    }
    get mutator() {
        return [this, (value) => {
                this.value = value;
            }];
    }
    subscribe(callback) {
        this._notifier.subscribe({ handleChange: (state, key) => {
                callback(state[key]);
            } });
    }
    ;
    [Symbol.toPrimitive]() {
        return typeof this.value != "object" ? this.value : new Proxy(this.value, {
            get(target, key) {
                return target[key] ? target[key] : undefined;
            }
        });
    }
}
//# sourceMappingURL=state.js.map