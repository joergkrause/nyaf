import { Email, Required, MaxLength, MinLength, Pattern } from '@nyaf/forms';
import { Type } from '@nyaf/lib';

export interface ErrorState {
  // TODO: siehe SVOGV deco pattern
  type?: Record<any, boolean>;
  error?: Record<any, string>;
  // any of the validators failed
  isValid: Record<any, boolean>;
}

export interface FieldState {
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
}

/**
 * In a form with validators this object returns the fields' states.
 */
export class ModelState<VM> {

  constructor() {
    this.validators = {} as any;
    this.state = {} as any;
  }

  /**
   * The summary of all states
   */
  get isValid(): boolean {
    return Object.keys(this.validators).map(key => this.validators[key].isValid).every(o => Object.keys(o).every(v => o[v]));
  }

  /**
   * The list of errors, each field with all states.
   */
  validators: Record<keyof VM, ErrorState>;

  /**
   * Set of states
   */
  state: Record<keyof VM, FieldState>;

  /**
   * Summary of all current errors / invalid fields
   */
  get summary(): Record<string, Record<string, string>> {
    const fields = Object.keys(this.validators);
    const validationInfo: Record<string, Record<string, string>>= {};
    fields.forEach(field => {
      const messages = this.validators[field].error;
      const isValids = this.validators[field].isValid;
      for (let isValid in isValids) {
        if (isValids[isValid] === false) {
          if (!validationInfo[field]) {
            validationInfo[field] = {};
          }
          validationInfo[field][isValid] = messages[isValid];
        }
      }
    });
    return validationInfo;
  }
}

