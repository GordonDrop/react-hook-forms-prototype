export type FieldSchema = {
  type: string;
  fullName: string;
  fieldName: string;
  required: boolean | string;
  show: boolean | string;
  validate?: ValidationRules;
  fields?: { [fieldName: string]: FieldSchema };
};

export type ValidationRules = { [rulesName: string]: ValidationRule };
type ValidationCb = (value: any) => boolean | string;
export type ValidationRule =
  | {
      value: string | boolean | number;
      message: string;
    }
  | ValidationCb;

export type ModelSchema = {
  type: string;
  fullName: string;
  description?: string;
  fields: { [fieldName: string]: FieldSchema };
};
