export const simpleFormSchema = {
  type: 'Schema',
  fullName: 'Simple Form Schema',
  fields: {
    string: {
      type: 'String',
      fullName: 'String Field',
      fieldName: 'string',
      required: false,
      show: 'this.boolean',
    },
    number: {
      type: 'Number',
      fullName: 'Number Field',
      fieldName: 'number',
      required: true,
      validate: {
        min: {
          value: 2,
          message: 'Value is too small, should be greater than or equal 2',
        },
        max: {
          value: 10,
          message: 'Value is too large, should be less than or equal 10',
        },
      },
      show: true,
    },
    boolean: {
      type: 'Boolean',
      fullName: 'Boolean Field',
      fieldName: 'boolean',
      required: true,
      show: true,
    },
  },
};
