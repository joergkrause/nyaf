
export interface Effect {
  /**
   * Any selector that's valid for `querySelectorAll`. Must return at least one element.
   */
  selector: string;
  /**
   * An event, such as 'click', that the selected element is able to fire. Can also be a custom event name.
   */
  trigger: 'abort' | 'afterprint' | 'animationend' | 'animationiteration' | 'animationstart' | 'beforeprint' | 'beforeunload' | 'blur' | 'canplay' | 'canplaythrough' | 'change' | 'click' | 'contextmenu' | 'copy' | 'cut' | 'dblclick' | 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'dragstart' | 'drop' | 'durationchange' | 'ended' | 'error' | 'focus' | 'focusin' | 'focusout' | 'fullscreenchange' | 'fullscreenerror' | 'hashchange' | 'input' | 'invalid' | 'keydown' | 'keypress' | 'keyup' | 'load' | 'loadeddata' | 'loadedmetadata' | 'loadstart' | 'message' | 'mousedown' | 'mouseenter' | 'mouseleave' | 'mousemove' | 'mouseover' | 'mouseout' | 'mouseup' | 'mousewheel' | 'offline' | 'online' | 'open' | 'pagehide' | 'pageshow' | 'paste' | 'pause' | 'play' | 'playing' | 'popstate' | 'progress' | 'ratechange' | 'resize' | 'reset' | 'scroll' | 'search' | 'seeked' | 'seeking' | 'select' | 'show' | 'stalled' | 'storage' | 'submit' | 'suspend' | 'timeupdate' | 'toggle' | 'touchcancel' | 'touchend' | 'touchmove' | 'touchstart' | 'transitionend' | 'unload' | 'volumechange' | 'waiting' | 'wheel' | string;
  /**
   * A selector function that retrieves a value from the derived event object. This value is the action's payload.
   * This function can be omitted if the action doesn't require any payload.
   */
  parameter?: (e: Event) => any;
  /**
   * The action that's being dispatched when the event occurs.
   */
  action: string;
}
