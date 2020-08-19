import React from 'react';
import { FormProvider, useForm, useFormContext, UseFormMethods } from 'react-hook-form';
import { ModelSchema } from './common';
import Field from './Field';

type ConnectFormProps = {
  children: any;
};
const ConnectForm: React.FC<ConnectFormProps> = ({ children }) => {
  const methods = useFormContext();
  return children({ ...methods });
};

const registerField = (
  modelSchema: ModelSchema,
  methods: UseFormMethods,
) => {
  return Object.entries(modelSchema.fields).map(([name, fieldSchema]) => {
    return (
      <Field
        key={name}
        name={name}
        modelSchema={modelSchema}
        fieldSchema={fieldSchema}
        methods={methods}
      />
    );
  });
};

const NestedForm: React.FC<{ modelSchema: ModelSchema }> = ({ modelSchema }) => (
  <ConnectForm>
    {(methods: UseFormMethods) => registerField(modelSchema, methods)}
  </ConnectForm>
);

/**
 * Form component
 */
const Form: React.FC<{ modelSchema: ModelSchema }> = ({ modelSchema }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <NestedForm modelSchema={modelSchema} />

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default Form;
