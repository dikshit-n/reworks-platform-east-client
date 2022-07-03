import { AnyObject, Maybe } from "yup/lib/types";

// yup
// https://github.com/jquense/yup/issues/312#issuecomment-745034006 --reference
declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    // declare all custom methods here
    password(message?: string): StringSchema<TType, TContext>;
    confirmPassword(
      reference: string,
      message?: string
    ): StringSchema<TType, TContext>;
  }
}
