import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
    input: "./index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        }
    ],
    external: [
        "tslib",
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript(),
    ]
};
