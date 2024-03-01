import { FormikErrors, FormikTouched } from 'formik';
import { toPath } from 'lodash';

export const getDisplayedError = <T>(
  formik: {
    errors: FormikErrors<T>;
    touched: FormikTouched<T>;
  },
  field: keyof T,
) => {
  if (!getIn(formik.touched, field)) {
    return undefined;
  }
  const errors = getIn(formik.errors, field);
  if (!errors) {
    return undefined;
  }
  if (typeof errors === 'string') {
    return errors;
  }
  if (Array.isArray(errors)) {
    return errors
      .map((e) => (typeof e === 'string' ? e : JSON.stringify(e)))
      .join(', ');
  }
  return JSON.stringify(errors);
};

function getIn(
  obj: any,
  key: string | string[] | number | symbol,
  def?: any,
  p: number = 0,
) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }

  // check if path is not in the end
  if (p !== path.length && !obj) {
    return def;
  }

  return obj === undefined ? def : obj;
}
