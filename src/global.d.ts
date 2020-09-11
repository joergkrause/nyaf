// declare module '*.scss';

// declare module '*.scss' {
//   const css: StyleSheet;
//   export default css;
// }

// declare module '*.css' {
//   export = StyleSheet;
// }

declare namespace JSX {
  interface IntrinsicElements {
    [tag: string]: any;
  }
}