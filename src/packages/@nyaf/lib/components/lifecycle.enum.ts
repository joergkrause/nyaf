/**
 * Life Cycle states exposed as function call.
 */
export enum LifeCycle {
  /**
   * Start, ctor is being called.
   */
  Init,
  /**
   * Component connects to backend.
   */
  Connect,
  /**
   * A change in the data object occured. This is a suitable place for adding subscribers.
   */
  SetData,
  /**
   * The render process is done and the component has been loaded. If usbsequent changes require rendering the content, the
   * component fires @see PreRender before and @Load after eweach such cycle. That means, especially for adding subscribers,
   * both events are not suitable.
   */
  Load,
  /**
   * The render method has been called and content is ready to be written to `innerHTML`. It's not yet written, actually.
   * Between this event and @see Load the templates and slots for shadowing are being created.
   */
  PreRender,
  /**
   * Component is going to be unloaded. This is a suitable place for removing subscribers.
   */
  Disconnect,
  /**
   * After calling the `dispose` method.
   */
  Disposed
}
