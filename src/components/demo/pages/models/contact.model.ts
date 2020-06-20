import { Required, Email, MaxLength, Display } from '@nyaf/forms';

export class ContactModel {

  constructor(init?: ContactModel) {
    if (init) {
      this.name = init.name;
      this.email = init.email;
    }
  }

  @Display('Contact Name')
  @Required()
  name: string;

  email: string;

  @Display('Your Message')
  @MaxLength(150)
  text: string = '';

  @Display('Is important')
  important: boolean = false;

  init(data: Partial<ContactModel>) {
    this.email = data.email;
  }

}
