import { Required, Email, MaxLength, Display } from '@nyaf/forms';

export class ContactModel {

  @Display('Contact Name')
  @Required()
  name: string = '';

  @Display('eMail Address')
  @Required()
  @Email()
  email: string = '';

  @Display('Your Message')
  @MaxLength(150)
  text: string = '';

  @Display('Is important')
  important: boolean = false;
}
