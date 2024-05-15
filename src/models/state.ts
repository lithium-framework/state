import { Notifier, Observable } from "@microsoft/fast-element";

export class State<T = any>{

  private _history : T[] = [];
  private _value:T = null;
  private _notifier:Notifier = Observable.getNotifier( this );

  constructor( value = null ){
    this._value = value;
  }

  get value() {
    Observable.track(this, 'value');
    return this._value;
  };

  set value(value: T) {
    this._value = value;

    this._history = [ this._value , ...this._history.reverse() ].reduce(( results , value ) => {
      if(results.length > 10){
        results.push( value );
      };
      return results;
    } , []).reverse();

    Observable.notify(this, 'value');
  }

  static init<T = any>( value : T = null ){
    return new State<T>( value );
  }

  get mutator():[ State<T> & T , ( newValue:T ) => void ]{
    return [ this as any , ( value:T ) => {
      this.value = value;
    } ]
  }

  subscribe( callback:(newValue: any) => void ){
    this._notifier.subscribe( { handleChange : ( state , key ) => {
      callback( state[key] );
    } } );
  };

  [Symbol.toPrimitive](){
    return typeof this.value != "object" ? this.value : new Proxy( this.value , {
      get( target , key ){
        return target[key] ? target[key] : undefined;
      }
    } )
  }

}