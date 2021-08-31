export function isFunction(callback) {
  if (typeof callback == "function") return true;
  else return false;
}


export function renderIfElse(condition, component1, component2) {
  if (condition) return component1;
  else return component2;
}
