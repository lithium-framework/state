var $8zHUo$microsoftfastelement = require("@microsoft/fast-element");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "State", () => $dc7a4a275be89dda$export$7254cc27399e90bd);
$parcel$export(module.exports, "createState", () => $f51c45449056d21a$export$e6a0daad8304de);

class $dc7a4a275be89dda$export$7254cc27399e90bd {
    constructor(value = null){
        /** 
     * Propriété privée pour stocker l'historique des valeurs d'état, limitée aux 10 dernières entrées.
    */ this._history = [];
        /** 
     * Propriété privée pour stocker la valeur actuelle de l'état, initialisée à `null`.
    */ this._value = null;
        /** 
     * Propriété privée pour notifier les observateurs des changements d'état, initialisée avec `Observable.getNotifier`.
    */ this._notifier = (0, $8zHUo$microsoftfastelement.Observable).getNotifier(this);
        this._value = value;
    }
    /** 
   * Getter pour la valeur actuelle de l'état. Utilise `Observable.track` pour suivre les changements.
  */ get value() {
        (0, $8zHUo$microsoftfastelement.Observable).track(this, "value");
        return this._value;
    }
    /**
   * Setter pour mettre à jour la valeur de l'état. Ajoute la valeur actuelle à l'historique et notifie
   * les observateurs du changement.
   * @param {T} value - Nouvelle valeur de l'état.
  */ set value(value) {
        this._value = value;
        this._history = [
            this._value,
            ...this._history.reverse()
        ].reduce((results, value)=>{
            if (results.length > 10) results.push(value);
            return results;
        }, []).reverse();
        (0, $8zHUo$microsoftfastelement.Observable).notify(this, "value");
    }
    /**
   * Méthode statique pour initialiser un nouvel objet `State` avec une valeur initiale facultative.
   * @param {T} [value=null] - Valeur initiale de l'état.
   * @returns Une nouvelle instance de `State` avec la valeur spécifiée.
  */ static init(value = null) {
        return new $dc7a4a275be89dda$export$7254cc27399e90bd(value);
    }
    /**
   * Renvoie un tableau avec l'état actuel et une fonction pour mettre à jour l'état.
   * @returns Un tableau contenant l'état actuel et une fonction de mise à jour.
  */ get mutator() {
        return [
            this,
            (value)=>{
                this.value = value;
            }
        ];
    }
    /** 
   * Abonne une fonction de rappel qui sera appelée à chaque changement de valeur de l'état.
   * @param {function} callback - Fonction à appeler lors d'un changement de valeur.
  */ subscribe(callback) {
        this._notifier.subscribe({
            handleChange: (state, key)=>{
                callback(state[key]);
            }
        });
    }
    /**
   * Convertit l'état en une valeur primitive pour les objets, ou en Proxy pour les objets complexes.
   * @returns La valeur primitive ou un Proxy pour les objets complexes.
  */ [Symbol.toPrimitive]() {
        return typeof this.value != "object" ? this.value : new Proxy(this.value, {
            get (target, key) {
                return target[key] ? target[key] : undefined;
            }
        });
    }
}



function $f51c45449056d21a$export$e6a0daad8304de(value = null) {
    return (0, $dc7a4a275be89dda$export$7254cc27399e90bd).init(value).mutator;
}




//# sourceMappingURL=main.js.map
