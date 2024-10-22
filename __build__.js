const esbuild = require("esbuild");

const entryFile = "./index.js";
const outfile = "./dist/index.js";

esbuild.buildSync({
  entryPoints: [entryFile],
  bundle: true,
  minify: true,
  outfile,
  sourcemap: true,
  logLevel: "info",
  platform: "browser",
  target: ["es2020", "chrome58", "edge16", "firefox57", "safari11"],
});
