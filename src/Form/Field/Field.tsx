import React from 'react';
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

const getValidationRules = (fieldSchema: FieldSchema, formData: object): ValidationRules => {
  const validationRules: ValidationRules = fieldSchema.validate || {};
  if (typeof fieldSchema.required === 'boolean') {
    validationRules.required = { value: true, message: `${fieldSchema.fieldName} is required` };
  }

  if (typeof fieldSchema.required === 'string') {
    validationRules.validate = (value) => {
      // @ts-ignore
      var isRequired = new Function('return ' + fieldSchema.required).call(formData);
      if (!isRequired) {
        return true;
      }

      return !value && `${fieldSchema.fieldName} is required`;
    };
  }

  return validationRules;
};

const FieldSet: React.FC<{ modelSchema: ModelSchema }> = ({ modelSchema }) => {
  return (
    <>
      {Object.entries(modelSchema.fields).map(([name, fieldSchema]) => {
        const childFieldProps = { modelSchema, fieldSchema, name };
        const Component = fieldSchema.fields ? ComplexField : PlainField;

        return <Component key={name} {...childFieldProps} />;
      })}
    </>
  );
};

const ComplexField: React.FC<FieldProps> = ({ fieldSchema, modelSchema, name }) => {
  return (
    <div className="form-box">
      <label className="label" htmlFor={name}>
        {fieldSchema.fullName} {fieldSchema.required && <span style={{ color: '#bf1650' }}>*</span>}
      </label>

      {Object.entries(fieldSchema.fields as object).map(([childFieldName, childFieldSchema]) => {
        const childFieldProps = {
          modelSchema,
          fieldSchema: childFieldSchema,
          name: `${name}.${childFieldName}`,
        };
        const Component = childFieldSchema.fields ? ComplexField : PlainField;

        return <Component key={childFieldProps.name} {...childFieldProps} />;
      })}
    </div>
  );
};

const PlainField: React.FC<FieldProps> = ({ fieldSchema, modelSchema, name }) => {
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
  const formData = useWatch({});
  // @ts-ignore
  const isVisible = new Function('return ' + fieldSchema.show).call(formData);

  return isVisible ? children : null;
};

const PrimitiveField: React.FC<FieldProps> = ({ fieldSchema, name }) => {
  const { register, errors, getValues } = useFormContext();

  return (
    <>
      <label className="label" htmlFor={name}>
        {fieldSchema.fullName} {fieldSchema.required && <span style={{ color: '#bf1650' }}>*</span>}
      </label>

      <input
        type={selectType(fieldSchema.type)}
        name={name}
        ref={register(getValidationRules(fieldSchema, getValues()))}
      />

      <div style={{ color: '#bf1650' }}>
        <ErrorMessage errors={errors} name={name} />
      </div>
    </>
  );
};

export default FieldSet;
