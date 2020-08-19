export const simpleFormSchema = {
  type: 'Schema',
  fullName: 'Simple Form Schema',
  fields: {
    string: {
      type: 'String',
      fullName: 'String Field',
      fieldName: 'string',
      required: true,
    },
    number: {
      type: 'Number',
      fullName: 'Number Field',
      fieldName: 'number',
      required: false,
    },
    boolean: {
      type: 'Boolean',
      fullName: 'Boolean Field',
      fieldName: 'boolean',
      required: false,
    },
  },
};
