import React  from 'react';
import { UseFormMethods } from 'react-hook-form';
import { FieldSchema, ModelSchema } from '../common';

export type FieldProps = {
  modelSchema: ModelSchema;
  fieldSchema: FieldSchema;
  name: string;
  methods: UseFormMethods;
};

const selectType = (type: string): string => {
  const typeMap: { [typeName: string]: string } = {
    String: 'text',
    Number: 'number',
    Boolean: 'checkbox',
  };

  return typeMap[type];
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ modelSchema, fieldSchema, name }, registerRef) => {
    return (
      <>
        <label className="label" htmlFor={name}>
          {fieldSchema.fullName}
        </label>
        <input type={selectType(fieldSchema.type)} name={name} ref={registerRef} />
      </>
    );
  },
);

export default Field;
