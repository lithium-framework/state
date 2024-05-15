import { State } from "./models/state.js";

export function createState< T = any >( value:T = null ):State< T >["mutator"]{

  return State.init( value ).mutator;

}