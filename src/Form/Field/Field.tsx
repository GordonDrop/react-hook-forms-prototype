import React, { useCallback, useEffect } from 'react';
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

const getValidationRules = (fieldSchema: FieldSchema, isRequired: boolean): ValidationRules => {
  const validationRules: ValidationRules = fieldSchema.validate || {};
  validationRules.required = { value: isRequired, message: `${fieldSchema.fieldName} is required` };

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
  let isObservable =
    typeof fieldSchema.required === 'string' || typeof fieldSchema.show === 'string';

  if (isObservable) {
    const nextProps = { required: fieldSchema.required, fieldSchema, modelSchema, name };
    return <ObservableField FieldComponent={PrimitiveField} {...nextProps} />;
  }

  const nextProps = { required: fieldSchema.required as boolean, fieldSchema, modelSchema, name };
  return <PrimitiveField {...nextProps} />;
};

type ObservableFieldProps = FieldProps & {
  required: boolean | string;
  FieldComponent: React.FC<PrimitiveFieldProps>;
};
const ObservableField: React.FC<ObservableFieldProps> = (props) => {
  const { FieldComponent, fieldSchema, required, modelSchema, name } = props;
  // sort of optimization to isolate rendering, should work without it
  const formData = useWatch({});
  const { trigger } = useFormContext();

  //--- required part
  // @ts-ignore
  // eslint-disable-next-line
  const isRequiredFn = new Function('return ' + required);
  let isRequired = Boolean(isRequiredFn.call(formData));

  useEffect(() => {
    trigger(name);
  }, [isRequired, name, trigger]);

  // --- show part
  // @ts-ignore
  // eslint-disable-next-line
  const isVisible = new Function('return ' + fieldSchema.show).call(formData);
  const nextProps = { required: isRequired, fieldSchema, modelSchema, name };

  return isVisible ? <FieldComponent {...nextProps} /> : null;
};

type PrimitiveFieldProps = FieldProps & { required: boolean };
const PrimitiveField: React.FC<PrimitiveFieldProps> = ({ fieldSchema, name, required }) => {
  const { register, errors } = useFormContext();
  const validationRulesCb = useCallback(getValidationRules, [required]);

  return (
    <>
      <label className="label" htmlFor={name}>
        {fieldSchema.fullName} {required && <span style={{ color: '#bf1650' }}>*</span>}
      </label>

      <input
        type={selectType(fieldSchema.type)}
        name={name}
        ref={register(validationRulesCb(fieldSchema, required))}
      />

      <div style={{ color: '#bf1650' }}>
        <ErrorMessage errors={errors} name={name} />
      </div>
    </>
  );
};

export default FieldSet;
