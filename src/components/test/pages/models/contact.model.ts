import { Required, Email, MaxLength } from '@nyaf/forms/';

export class ContactModel {
  @Required()
  name: string = '';

  @Required()
  @Email()
  email: string = '';

  @MaxLength(150)
  text: string = '';

  important: boolean = false;
}
