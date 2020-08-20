import React from 'react';
import Form from '../../Form';
import { simpleFormWithRequiredSchema } from './simple-form-with-required.schema';

const SimpleFormWithRequired: React.FC = () => <Form modelSchema={simpleFormWithRequiredSchema} />;

export default SimpleFormWithRequired;
