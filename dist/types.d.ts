/**
 * La classe `State` gère et suit les valeurs d'état avec des capacités d'historique et d'abonnement.
 */
export class State<T = any> {
    constructor(value?: any);
    /**
     * Getter pour la valeur actuelle de l'état. Utilise `Observable.track` pour suivre les changements.
    */
    get value(): T;
    /**
     * Setter pour mettre à jour la valeur de l'état. Ajoute la valeur actuelle à l'historique et notifie
     * les observateurs du changement.
     * @param {T} value - Nouvelle valeur de l'état.
    */
    set value(value: T);
    /**
     * Méthode statique pour initialiser un nouvel objet `State` avec une valeur initiale facultative.
     * @param {T} [value=null] - Valeur initiale de l'état.
     * @returns Une nouvelle instance de `State` avec la valeur spécifiée.
    */
    static init<T = any>(value?: T): State<T>;
    /**
     * Renvoie un tableau avec l'état actuel et une fonction pour mettre à jour l'état.
     * @returns Un tableau contenant l'état actuel et une fonction de mise à jour.
    */
    get mutator(): [State<T> & T, (newValue: T) => void];
    /**
     * Abonne une fonction de rappel qui sera appelée à chaque changement de valeur de l'état.
     * @param {function} callback - Fonction à appeler lors d'un changement de valeur.
    */
    subscribe(callback: (newValue: any) => void): void;
    /**
     * Convertit l'état en une valeur primitive pour les objets, ou en Proxy pour les objets complexes.
     * @returns La valeur primitive ou un Proxy pour les objets complexes.
    */
    [Symbol.toPrimitive](): T;
}
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
export function createState<T = any>(value?: T): State<T>["mutator"];

//# sourceMappingURL=types.d.ts.map
