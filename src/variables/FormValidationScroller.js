import _ from "lodash";
import { scroller } from "react-scroll";

function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );
}
function getErrorFieldNames(obj, name = "") {
  const errorArr = [];
  errorArr.push(
    Object.keys(obj)
      .map(key => {
        const next = obj[key];
        if (next) {
          if (typeof next === "string") {
            return name + key;
          }
          // Keep looking
          if (next.map) {
            errorArr.push(
              next
                .map((item, index) =>
                  getErrorFieldNames(item, `${name}${key}[${index}].`)
                )
                .filter(o => o)
            );
          }
        }
        return null;
      })
      .filter(o => o)
  );
  return flatten(errorArr);
}

export default function formValidationScroller(errors) {
  if (_.isEmpty(errors)) return false;
  const errorFields = getErrorFieldNames(errors);
  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = errorFields[i];
    // Checking if the marker exists in DOM
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -200, smooth: true });
      break;
    }
  }
  return false;
}
