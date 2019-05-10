/**
 * The Template decorator.
 *
 * One can define the way a property gets rendered.
 * Currently supported:
 *  - TextArea
 *  - Calendar
 *  - Range
 *  - Number
 *  - Text
 *
 * The Calendar creates Date-fielsd. However, in casde of a datatype Date the date field will be created anyway.
 *
 * @param template        The Name that appears in form fields as a watermark.
 * @param params          Depending of template some additional values as a dictionary.
 */
export function TemplateHint(template: string, params?: { key: string; value: any }[]) {
  // the original decorator
  function templateHintInternal(target: Object, name: string): void {
    templateHintInternalSetup(target, name, template, params);
  }

  // return the decorator
  return templateHintInternal;
}

export function templateHintInternalSetup(target: any, key: string, template: string, params?: { key: string; value: any }[]) {
  // create a helper property to transport a meta data value
  Object.defineProperty(target, `__templatehint__${key}`, {
    value: template,
    enumerable: false,
    configurable: false
  });
  if (params) {
    Object.defineProperty(target, `__templatehintParams__${key}`, {
      value: params,
      enumerable: false,
      configurable: false
    });
  }
  Object.defineProperty(target, `__hasTemplateHint__${key}`, {
    value: true,
    enumerable: false,
    configurable: false
  });
}
