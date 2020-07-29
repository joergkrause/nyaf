changeOtherButton(e: CustomEvent) {
  this.querySelector<ButtonComponent>('app-button[data-demo-button]').setData('text', Math.round(Math.random() * 100));
}

changeOtherButtonToZeros(e: CustomEvent) {
  this.querySelector<ButtonComponent>('app-button[data-demo-button]').setZero();
}