export type FieldSchema = {
  type: string;
  fullName: string;
  fieldName: string;
  required: Boolean;
  validate?: ValidationRules;
  fields?: { [fieldName: string]: FieldSchema };
  show: boolean | string;
};

export type ValidationRules = { [rulesName: string]: ValidationRule };
export type ValidationRule = {
  value: string | boolean | number | Function;
  message: string,
};

export type ModelSchema = {
  type: string;
  fullName: string;
  fields: { [fieldName: string]: FieldSchema };
};
