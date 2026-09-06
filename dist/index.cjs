'use strict';

var promises = require('fs/promises');
var path = require('path');
var url = require('url');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
// src/scaffold.ts
var PROJECT_ROOT = path.join(path.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)))), "..");
var TEMPLATE_DIR = path.join(PROJECT_ROOT, "template");
var VARIABLES = {
  "<PACKAGE_NAME>": (targetDir) => path.basename(targetDir)
};
async function scaffold(targetDir) {
  const target = path.resolve(targetDir);
  await promises.mkdir(target, { recursive: true });
  await copyTree(TEMPLATE_DIR, target);
  return target;
}
async function copyTree(from, to) {
  const entries = await promises.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await promises.mkdir(dest, { recursive: true });
      await copyTree(src, dest);
    } else {
      let data = await promises.readFile(src, "utf8");
      for (const [token, resolve2] of Object.entries(VARIABLES)) {
        data = data.replaceAll(token, resolve2(to));
      }
      await promises.writeFile(dest, data, "utf8");
    }
  }
}

exports.TEMPLATE_DIR = TEMPLATE_DIR;
exports.scaffold = scaffold;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map