/**
 * Life Cycle states exposed as function call.
 */
export enum LifeCycle {
  /**
   * Start, ctor is being called.
   */
  Init,
  /**
   * Component connects to backend
   */
  Connect,
  /**
   * A change in the data object occured.
   */
  SetData,
  /**
   * The render process is done and the component has been loaded
   */
  Load,
  /**
   * The render method has been called and content is written to `innerHTML`.
   */
  PreRender,
  /**
   * Component is going to be unloaded.
   */
  Disconnect,
  /**
   * After calling the `dispose` method.
   */
  Disposed
}
