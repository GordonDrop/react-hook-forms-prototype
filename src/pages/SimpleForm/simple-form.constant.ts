export const simpleFormSchema = {
  type: 'Schema',
  fullName: 'Simple Form Schema',
  fields: {
    string: {
      type: 'String',
      fullName: 'String Field',
      required: true,
    },
    number: {
      type: 'Number',
      fullName: 'Number Field',
    },
    boolean: {
      type: 'Boolean',
      fullName: 'Boolean Field',
    },
  },
};
