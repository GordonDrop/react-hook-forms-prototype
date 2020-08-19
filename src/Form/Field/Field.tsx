import React, { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FieldSchema, ModelSchema, ValidationRules } from '../common';

export type FieldProps = {
  modelSchema: ModelSchema;
  fieldSchema: FieldSchema;
  name: string;
};

const selectType = (type: string): string => {
  const typeMap: { [typeName: string]: string } = {
    String: 'text',
    Number: 'number',
    Boolean: 'checkbox',
  };

  return typeMap[type];
};

const getValidationRules = (fieldSchema: FieldSchema) : ValidationRules  => {
  const validationRules : ValidationRules = fieldSchema.validate || {};
  if (fieldSchema.required) {
    validationRules.required = { value: true, message: `${fieldSchema.fieldName} is required` };
  }

  return validationRules;
};

const Field: React.FC<FieldProps> = ({ fieldSchema, name, modelSchema }) => {
  if (typeof fieldSchema.show === 'string') {
    return (
      <ObservableField fieldSchema={fieldSchema}>
        <PrimitiveField modelSchema={modelSchema} fieldSchema={fieldSchema} name={name} />
      </ObservableField>
    );
  }

  return <PrimitiveField modelSchema={modelSchema} fieldSchema={fieldSchema} name={name} />;
};

const ObservableField: React.FC<{ fieldSchema: FieldSchema }> = ({
  fieldSchema,
  children,
}: any) => {
  const { control } = useFormContext();
  const formData = useWatch({ control });
  const isVisible = new Function('return ' + fieldSchema.show).call(formData);

  return isVisible ? children : null;
};

const PrimitiveField: React.FC<FieldProps> = ({ fieldSchema, name }) => {
  const { register, errors } = useFormContext();
  const validationRules = useCallback(getValidationRules, []);

  return (
    <>
      <label className="label" htmlFor={name}>
        {fieldSchema.fullName}
        {" "}
        {fieldSchema.required && (<span style={{color: '#bf1650'}}>*</span>)}
      </label>

      <input
        type={selectType(fieldSchema.type)}
        name={name}
        ref={register(validationRules(fieldSchema))}
      />

      <div style={{color: '#bf1650'}}>
        <ErrorMessage
          errors={errors}
          name={name}
        />
      </div>
    </>
  );
};

export default Field;
