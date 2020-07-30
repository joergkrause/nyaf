import { Email, Required, StringLength, MinLength } from '@nyaf/forms';
import { Type } from '@nyaf/lib';

// type validators = Type<Email> | Required | StringLength | MinLength;

export interface ErrorState {
  // TODO: siehe SVOGV deco pattern
  type: Record<'pattern' | 'required', boolean>;
  error: string;
  // any of the validators failed
  isValid: boolean;
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

  /**
   * The summary of all states
   */
  isValid: boolean;

  /**
   * The list of errors, each field with all states.
   */
  validators: Record<keyof VM, ErrorState>;

  /**
   * Set of states
   */
  state: Record<keyof VM, FieldState>;

}

