import { State } from "./models/state.js";
export function createState(value = null) {
    return State.init(value).mutator;
}
//# sourceMappingURL=createState.js.map