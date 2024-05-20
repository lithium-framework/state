/**
 * La classe `State` gère et suit les valeurs d'état avec des capacités d'historique et d'abonnement.
 */
export declare class State<T = any> {
    /**
     * Propriété privée pour stocker l'historique des valeurs d'état, limitée aux 10 dernières entrées.
    */
    private _history;
    /**
     * Propriété privée pour stocker la valeur actuelle de l'état, initialisée à `null`.
    */
    private _value;
    /**
     * Propriété privée pour notifier les observateurs des changements d'état, initialisée avec `Observable.getNotifier`.
    */
    private _notifier;
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
