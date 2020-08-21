const nestedFormWithShowSchema = {
  type: 'Schema',
  fullName: 'Nested Form Schema With Dynamic Show',
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
      fullName: 'Object1 root: Hidden if b3 checked',
      fieldName: 'o1',
      required: false,
      show: '!this?.o2?.b3',
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
              fullName: 'Visible if b1 checked',
              fieldName: 'o1o2n1',
              required: false,
              show: 'this?.o2?.b1',
            },
            o1o2s2: {
              type: 'String',
              fullName: 'Visible if b2 checked',
              fieldName: 'o1o2s2',
              required: false,
              show: 'this?.o2?.b2',
            },
          },
        },
      },
    },

    o2: {
      type: 'Object',
      fullName: 'Object2 root',
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
        b3: {
          type: 'Boolean',
          fullName: 'Hide Object1',
          fieldName: 'b3',
          required: true,
          show: true,
        },
      },
    },
  },
};

export default nestedFormWithShowSchema;
