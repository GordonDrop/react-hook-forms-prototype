import React from 'react';
import Form from '../../Form';
import { nestedFormWithRequireSchema } from './nested-form-with-require.schema';

export const NestedFormWithRequire: React.FC = () => (
  <Form modelSchema={nestedFormWithRequireSchema} />
);
