// rollup.config.js
import VuePlugin from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import minimist from "minimist";
import resolve from "rollup-plugin-node-resolve";

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: "src/index.ts",
  inlineDynamicImports: true,
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
      clean: true
    }),
    VuePlugin({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      },
      defaultLang: {
        script: 'ts'
      }
    })
  ]
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  "nativescript-vue",
  "vue-property-decorator",
  "vue-class-component",
  "nativescript-tweenjs",
  "tns-core-modules/ui/gestures",
  "tns-core-modules/platform",
  "tns-core-modules/application",
  "tns-core-modules/ui/frame",
];
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  "nativescript-tweenjs": "nativescriptTweenjs",
  "vue-property-decorator": "vuePropertyDecorator",
  "tns-core-modules/ui/gestures": "gestures",
  "tns-core-modules/platform": "platform",
  "tns-core-modules/application": "application",
  "tns-core-modules/ui/frame": "frame",
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: "dist/nativescript-copilot.esm.js",
      format: "esm",
      exports: "named"
    },
    plugins: [
      ...baseConfig.plugins
      // terser({
      //   output: {
      //     ecma: 6
      //   }
      // })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "umd") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/nativescript-copilot.umd.js",
      format: "umd",
      name: "NativescriptVueCopilot",
      exports: "named",
      globals
    },
    plugins: [
      ...baseConfig.plugins
      // terser({
      //   output: {
      //     ecma: 6
      //   }
      // })
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/nativescript-copilot.js",
      format: "iife",
      name: "NativescriptVueCopilot",
      exports: "named",
      globals
    },
    plugins: [
      ...baseConfig.plugins
      // terser({
      //   output: {
      //     ecma: 5
      //   }
      // })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
