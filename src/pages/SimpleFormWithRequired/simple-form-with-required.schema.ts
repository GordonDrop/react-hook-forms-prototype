const simpleFormWithRequiredSchema = {
  type: 'Schema',
  fullName: 'Simple Form Schema With Dynamic Show',
  description: 'Click "Boolean" checkbox to make "String" field required',
  fields: {
    string: {
      type: 'String',
      fullName: 'String Field',
      fieldName: 'string',
      required: 'this.boolean',
      show: true,
    },
    number: {
      type: 'Number',
      fullName: 'Number Field',
      fieldName: 'number',
      required: false,
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

export default simpleFormWithRequiredSchema;
