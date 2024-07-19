import { Observable } from "@microsoft/fast-element";
/**
 * La classe `State` gère et suit les valeurs d'état avec des capacités d'historique et d'abonnement.
 */
export class State {
    /**
     * Propriété privée pour stocker l'historique des valeurs d'état, limitée aux 10 dernières entrées.
    */
    _history = [];
    /**
     * Propriété privée pour stocker la valeur actuelle de l'état, initialisée à `null`.
    */
    _value = null;
    /**
     * Propriété privée pour notifier les observateurs des changements d'état, initialisée avec `Observable.getNotifier`.
    */
    _notifier = Observable.getNotifier(this);
    constructor(value = null) {
        this._value = value;
    }
    /**
     * Getter pour la valeur actuelle de l'état. Utilise `Observable.track` pour suivre les changements.
    */
    get value() {
        Observable.track(this, 'value');
        return this._value;
    }
    ;
    /**
     * Setter pour mettre à jour la valeur de l'état. Ajoute la valeur actuelle à l'historique et notifie
     * les observateurs du changement.
     * @param {T} value - Nouvelle valeur de l'état.
    */
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
    /**
     * Méthode statique pour initialiser un nouvel objet `State` avec une valeur initiale facultative.
     * @param {T} [value=null] - Valeur initiale de l'état.
     * @returns Une nouvelle instance de `State` avec la valeur spécifiée.
    */
    static init(value = null) {
        return new State(value);
    }
    /**
     * Renvoie un tableau avec l'état actuel et une fonction pour mettre à jour l'état.
     * @returns Un tableau contenant l'état actuel et une fonction de mise à jour.
    */
    get mutator() {
        return [this, (value) => {
                this.value = value;
            }];
    }
    /**
     * Abonne une fonction de rappel qui sera appelée à chaque changement de valeur de l'état.
     * @param {function} callback - Fonction à appeler lors d'un changement de valeur.
    */
    subscribe(callback) {
        this._notifier.subscribe({ handleChange: (state, key) => {
                callback(state[key]);
            } });
    }
    ;
    /**
     * Convertit l'état en une valeur primitive pour les objets, ou en Proxy pour les objets complexes.
     * @returns La valeur primitive ou un Proxy pour les objets complexes.
    */
    [Symbol.toPrimitive]() {
        return typeof this.value != "object" ? this.value : new Proxy(this.value, {
            get(target, key) {
                return target[key] ? target[key] : undefined;
            }
        });
    }
}
//# sourceMappingURL=state.js.map