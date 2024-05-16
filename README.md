# Lithium State

# **Gestion des États avec Lithium**

Lithium fournit une gestion des états puissante et intuitive, permettant de suivre et de réagir aux changements de valeurs de manière efficace. Ce guide explique comment utiliser la classe **`State`** et la fonction **`createState`** pour gérer les états dans vos applications.

## **Table des Matières**

## **Introduction**

Lithium propose une gestion d'état élégante basée sur des objets observables. Les états permettent de suivre et de réagir aux changements de manière réactive, simplifiant ainsi la gestion des données dans vos applications.

## **Installation**

Installez Lithium state via npm :

```bash
npm install @lithium-framework/state
```

## **Utilisation**

### **Initialisation d'un État**

Pour initialiser un état, utilisez la classe **`State`** ou la fonction **`createState`** :

```tsx
import { State, createState } from '@lithium-framework/state';

// Utilisation de la classe State
let state = State.init<number>(0);

// Utilisation de la fonction createState
let [counter, setCounter] = createState<number>(0);
```

### **Souscription aux Changements d'État**

Vous pouvez souscrire aux changements d'état pour réagir aux modifications de valeur :

```tsx
// Souscrire aux changements d'état avec la classe State
state.subscribe((newValue) => {
  console.log('Nouvelle valeur:', newValue);
});

// Souscrire aux changements d'état avec createState
counter.subscribe((newValue) => {
  console.log({ newValue });
});

// Mettre à jour l'état
setCounter(counter.value + 1);
```

### **Historique des États**

Lithium maintient un historique des valeurs d'état, permettant de suivre les changements successifs :

```tsx
state.value = 1;
state.value = 2;

// Affiche les valeurs précédentes, jusqu'à 10 entrées
console.log(state.history);
```

### **Mutateurs**

Les mutateurs permettent de gérer l'état et de le mettre à jour de manière fluide :

```tsx
let [ counter, setCounter ] = state.mutator;

setCounter(10); // Met à jour l'état à 10
console.log(counter.value); // Affiche 10
```

### **Symbol.toPrimitive**

Lithium permet de convertir des objets d'état en valeurs primitives de manière personnalisée :

```tsx
// Utilise Symbol.toPrimitive pour obtenir la valeur primitive
let primitiveValue = +state; 

console.log(primitiveValue);

```

## **API de Référence**

### **`State<T>`**

- **Propriétés :**
    - **`value: T`** - Obtient ou définit la valeur actuelle de l'état.
    - **`history: T[]`** - Obtient l'historique des valeurs de l'état (jusqu'à 10 entrées).
- **Méthodes :**
    - **`static init<T>(value: T): State<T>`** - Initialise un nouvel état avec la valeur spécifiée.
    - **`subscribe(callback: (newValue: any) => void): void`** - Souscrit aux changements de valeur de l'état.
    - **`mutator: [State<T> & T, (newValue: T) => void]`** - Renvoie un tableau contenant l'état et une fonction pour le mettre à jour.

### **`createState<T>(value: T): [State<T> & T, (newValue: T) => void]`**

Crée un état avec une valeur initiale et renvoie son mutateur.

## **Exemples Complets**

### **Exemple 1 : Compteur Réactif**

```tsx
typescriptCopier le code
import { createState } from 'lithium';

let [ counter, setCounter ] = createState<number>(0);

counter.subscribe(( newValue ) => {
  console.log('Valeur du compteur:', newValue);
});

setCounter(counter.value + 1); // Incrémente le compteur

```

### **Exemple 2 : Historique des États**

```tsx
typescriptCopier le code
import { State } from 'lithium';

let state = State.init<number>(0);

state.value = 1;
state.value = 2;
state.value = 3;

console.log(state.history); // Affiche [0, 1, 2]

```

## **Contribuer**

Les contributions sont les bienvenues !