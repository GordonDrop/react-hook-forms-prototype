import React from 'react';
import Form from '../../Form';
import nestedFormWithRequireSchema from './nested-form-with-require.schema';

const NestedFormWithRequire: React.FC = () => <Form modelSchema={nestedFormWithRequireSchema} />;

export default NestedFormWithRequire;
