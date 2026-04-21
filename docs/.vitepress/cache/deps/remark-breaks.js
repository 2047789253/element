import {
  findAndReplace
} from "./chunk-WS5NZ3JI.js";
import "./chunk-QVYZUROJ.js";
import "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/mdast-util-newline-to-break@2.0.0/node_modules/mdast-util-newline-to-break/lib/index.js
function newlineToBreak(tree) {
  findAndReplace(tree, [/\r?\n|\r/g, replace]);
}
function replace() {
  return { type: "break" };
}

// node_modules/.pnpm/remark-breaks@4.0.0/node_modules/remark-breaks/lib/index.js
function remarkBreaks() {
  return function(tree) {
    newlineToBreak(tree);
  };
}
export {
  remarkBreaks as default
};
//# sourceMappingURL=remark-breaks.js.map
