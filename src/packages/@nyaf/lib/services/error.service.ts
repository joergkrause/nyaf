/**
 * Error handling with URL support
 * @internal
 */
export class ErrorHandler {

  public static Throw(err: string, con = true): never {
    const text = 'An internal error occured (' + err + ')';
    const url = 'https://nyaf.comzept.de/be/err/' + err;
    con ? console.error(text) : void 0;
    throw new Error(url);
  }

}
