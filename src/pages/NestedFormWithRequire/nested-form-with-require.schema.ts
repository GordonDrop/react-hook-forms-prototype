const nestedFormWithRequireSchema = {
  type: 'Schema',
  fullName: 'Nested Form Schema With Dynamic Require',
  fields: {
    s1: {
      type: 'String',
      fullName: 'string level1',
      fieldName: 's1',
      required: false,
      show: true,
    },
    o1: {
      type: 'Object',
      fullName: 'Object1 root',
      fieldName: 'o1',
      required: false,
      show: true,
      fields: {
        o1s2: {
          type: 'String',
          fullName: 'Second level string',
          fieldName: 'string',
          required: false,
          show: true,
        },
        o1o2: {
          type: 'Object',
          fullName: 'Object2 root',
          fieldName: 'o1o2',
          required: false,
          show: true,
          fields: {
            o1o2s1: {
              type: 'String',
              fullName: 'string level2',
              fieldName: 'o1o2s1',
              required: false,
              show: true,
            },
            o1o2n1: {
              type: 'Number',
              fullName: 'Required if b1 checked',
              fieldName: 'o1o2n1',
              required: 'this?.o2?.b1',
              show: true,
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
            },
            o1o2s2: {
              type: 'String',
              fullName: 'Required if b2 checked',
              fieldName: 'o1o2s2',
              required: 'this?.o2?.b2',
              show: true,
            },
          },
        },
      },
    },

    o2: {
      type: 'Object',
      fullName: 'Object1 root',
      fieldName: 'o2',
      required: false,
      show: true,
      fields: {
        b1: {
          type: 'Boolean',
          fullName: 'Show string field on Object1',
          fieldName: 'b1',
          required: true,
          show: true,
        },
        b2: {
          type: 'Boolean',
          fullName: 'Show number field on Object1',
          fieldName: 'b2',
          required: true,
          show: true,
        },
      },
    },
  },
};

export default nestedFormWithRequireSchema;
