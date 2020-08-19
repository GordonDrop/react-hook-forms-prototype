export type FieldSchema = {
  type: string;
  fullName: string;
  fieldName: string;
  required: Boolean;
  validate?: ValidationRule[];
  fields?: { [fieldName: string]: FieldSchema };
};

export type ValidationRule = {
  validator: string;
  arguments: { [option: string]: string };
  errorMessages: { [message: string]: string };
};

export type ModelSchema = {
  type: string;
  fullName: string;
  fields: { [fieldName: string]: FieldSchema };
};
