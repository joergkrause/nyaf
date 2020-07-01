import { Required, Email, MaxLength, Display, Translate } from '@nyaf/forms';

const json = {
  'Contact eMail': 'Kontakt-E-Mail'
};

@Translate(json)
export class ContactModel {

  constructor(init?: ContactModel) {
    if (init) {
      this.name = init.name;
      this.email = init.email;
    }
  }

  @Display('Contact Name')
  @Required()
  name = '';

  @Translate(json)
  @Display('Contact eMail')
  @Required()
  @Email('The field "Contact eMail" should be formatted properly')
  email = '';

  @Display('Your Message')
  @MaxLength(150)
  text = '';

  @Display('Is important')
  important = false;

  init(data: Partial<ContactModel>) {
    this.email = data.email;
  }

}
