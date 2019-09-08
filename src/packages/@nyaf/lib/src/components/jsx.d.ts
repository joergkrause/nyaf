/**
 * The support method for the render method of components. Just import, but never call directly. The TypeScript compiler uses this function.
 *
 * It's a default export, so this import will work:
 *
 * `import JSX from 'nyaf`;
 *
 * Also, don't forget to setup *tsconfig.json* properly to support *jsx* and use the namespace JSX (in uppercase letters).
 *
 * */
declare const JSX: {
    createElement(name: string, props: {
        [id: string]: string;
    }, ...content: string[]): string | any[];
};
export default JSX;
