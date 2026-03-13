import { build } from "bun";

await build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  format: "esm",
  splitting: false,
  minify: false,
  sourcemap: "linked",
});

const tsc = Bun.spawn([
  "bun",
  "run",
  "tsc",
  "--declaration",
  "--declarationMap",
  "--emitDeclarationOnly",
]);
await tsc.exited;
