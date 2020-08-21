import React, { useCallback, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FieldSchema, ModelSchema, ValidationRules } from '../common';

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
        const childFieldProps = { required: fieldSchema.required, modelSchema, fieldSchema, name };
        return <MaybeObservableField key={name} {...childFieldProps} />;
      })}
    </>
  );
};

export type BaseFieldProps = {
  modelSchema: ModelSchema;
  fieldSchema: FieldSchema;
  name: string;
};

export type MaybeObservableFieldProps = BaseFieldProps & { required: string | boolean };
const MaybeObservableField: React.FC<MaybeObservableFieldProps> = (props) => {
  const { required, fieldSchema } = props;

  const isObservable = typeof required === 'string' || typeof fieldSchema.show === 'string';

  if (isObservable) {
    return <ObservableField {...props} />;
  }

  return <MaybeComplexField {...(props as FieldProps)} />;
};

const ObservableField: React.FC<MaybeObservableFieldProps> = (props) => {
  const { fieldSchema, required, modelSchema, name } = props;
  // sort of optimization to isolate rendering, should work without it
  const formData = useWatch({});
  const { trigger } = useFormContext();

  // --- required part
  // eslint-disable-next-line
  const isRequiredFn = new Function('return ' + required);
  const isRequired = Boolean(isRequiredFn.call(formData));

  useEffect(() => {
    trigger(name);
  }, [isRequired, name, trigger]);

  // visible part
  // eslint-disable-next-line
  const isVisible = new Function('return ' + fieldSchema.show).call(formData);
  const nextProps = { required: isRequired, fieldSchema, modelSchema, name };

  return isVisible ? <MaybeComplexField {...nextProps} /> : null;
};

export type FieldProps = BaseFieldProps & { required: boolean };
const MaybeComplexField: React.FC<FieldProps> = (props) => {
  const { fieldSchema } = props;
  if (fieldSchema.fields) {
    return <ComplexField {...props} />;
  }
  return <PlainField {...props} />;
};

const ComplexField: React.FC<FieldProps> = ({ fieldSchema, modelSchema, name, required }) => {
  return (
    <div className="form-box">
      <FieldLabel fieldName={name} displayName={fieldSchema.fullName} required={required} />

      {Object.entries(fieldSchema.fields as object).map(([childFieldName, childFieldSchema]) => {
        const childFieldProps = {
          modelSchema,
          fieldSchema: childFieldSchema,
          name: `${name}.${childFieldName}`,
          required: childFieldSchema.required,
        };

        return <MaybeObservableField key={childFieldProps.name} {...childFieldProps} />;
      })}
    </div>
  );
};

const PlainField: React.FC<FieldProps> = ({ fieldSchema, name, required }) => {
  const { register, errors } = useFormContext();
  const validationRulesCb = useCallback(getValidationRules, [required]);

  return (
    <>
      <FieldLabel fieldName={name} displayName={fieldSchema.fullName} required={required} />

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

const FieldLabel: React.FC<{ fieldName: string; displayName: string; required: boolean }> = ({
  fieldName,
  displayName,
  required,
}) => {
  return (
    <label className="label" htmlFor={fieldName}>
      {displayName} {required && <span style={{ color: '#bf1650' }}>*</span>}
    </label>
  );
};

export default FieldSet;
