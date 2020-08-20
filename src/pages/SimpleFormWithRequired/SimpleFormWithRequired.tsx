import React from 'react';
import Form from '../../Form';
import { simpleFormWithRequiredSchema } from './simple-form-with-required.schema';

export const SimpleFormWithRequired: React.FC = () => (
  <Form modelSchema={simpleFormWithRequiredSchema} />
);
