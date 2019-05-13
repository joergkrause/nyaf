/**
* The Width decorator. Width of colum in px.
*
* @param width          Optional, default is 100.
*/
export declare function Width(width?: number): (target: Object, property: string | symbol) => void;
export declare function widthInternalSetup(target: any, key: string, width: number): void;
