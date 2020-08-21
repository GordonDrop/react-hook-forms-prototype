import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModelSchema } from './common';
import FieldSet from './Field';

const Form: React.FC<{ modelSchema: ModelSchema }> = ({ modelSchema }) => {
  const methods = useForm();
  const { handleSubmit, formState, getValues } = methods;

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <div className="grid">
        <div className="grid-col">
          <pre>
            Form state:
            {JSON.stringify(formState, null, 2)}
          </pre>

          <pre>
            Form data:
            {JSON.stringify(getValues(), null, 2)}
          </pre>
        </div>

        <div className="grid-col">
          <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
            <header>
              <h2>{modelSchema.fullName}</h2>
              {modelSchema.description && <p>{modelSchema.description}</p>}
            </header>

            <FieldSet modelSchema={modelSchema} />

            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Form;
