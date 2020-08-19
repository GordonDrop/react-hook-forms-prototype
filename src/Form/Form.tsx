import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModelSchema } from './common';
import Field from './Field';

const NestedForm: React.FC<{ modelSchema: ModelSchema }> = ({ modelSchema }) => {
  return (
    <>
      {Object.entries(modelSchema.fields).map(([name, fieldSchema]) => {
        return <Field key={name} name={name} modelSchema={modelSchema} fieldSchema={fieldSchema} />;
      })}
    </>
  );
};

/**
 * Form component
 */
const Form: React.FC<{ modelSchema: ModelSchema }> = ({ modelSchema }) => {
  const methods = useForm();
  const { handleSubmit, formState } = methods;

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <pre>
          {JSON.stringify(formState, null, 2)}
        </pre>

        <NestedForm modelSchema={modelSchema} />

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;
