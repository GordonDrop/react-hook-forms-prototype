import React from 'react';
import Form from '../../Form';
import { simpleFormSchema } from './simple-form.schema';

const SimpleForm: React.FC = () => <Form modelSchema={simpleFormSchema} />;

export default SimpleForm;
