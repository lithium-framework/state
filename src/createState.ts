import { State } from "./models/state.js";

/**
 * La fonction createState crée un état avec une valeur initiale et renvoie son mutateur.
 * @param {T} [value=null] - Le paramètre `value` dans la fonction `createState` est la valeur initiale
 * que vous souhaitez définir pour l'état. Il est facultatif et la valeur par défaut est « null » si
 * aucune valeur n'est fournie lors de l'appel de la fonction.
 * @returns La fonction `createState` renvoie la fonction `mutator` à partir de l'objet `State`
 * initialisé avec la `valeur` fournie.
 * ## Exemple 
 * ```typescript
 * let [ counter , setCounter ] = createState<number>(0);
 * 
 * counter.subscribe(( newValue ) => {
 *  
 *  console.log({newValue})
 * 
 * })
 * ```
 */
export function createState< T = any >( value:T = null ):State< T >["mutator"]{

  return State.init( value ).mutator;

}