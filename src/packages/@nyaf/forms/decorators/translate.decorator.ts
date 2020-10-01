/**
 * The Translate decorator.
 *
 * A decorated parameter can access i18n settings to create translated text.
 *
 * @param json          Translation data as dictionary.
 */
export function Translate(json: { [key: string]: string }): any {

  function handleTranslation(target: object, propertyKey: string) {
    Object.getOwnPropertyNames(target)
    .filter((key: string) => key.endsWith(propertyKey))
    .forEach(key => {
      const index = target[key];
      if (Object.getOwnPropertyDescriptor(target, key).writable) {
        target[key] = json[index];
      }
    });

  }

  return function (
    target: any,
    propertyKey: string | symbol
  ): any {
    if (!propertyKey) {
      // on class, look for all props
      Object.getOwnPropertyNames(target).forEach(key => {
        handleTranslation(target, key);
      });
    } else {
      handleTranslation(target, propertyKey.toString());
    }
  };
}
