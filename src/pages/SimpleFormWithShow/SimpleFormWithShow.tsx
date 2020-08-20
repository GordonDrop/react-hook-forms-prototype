import React from 'react';
import Form from '../../Form';
import { simpleFormWithShowSchema } from './simple-form-with-show.schema';

export const SimpleFormWithShow: React.FC = () => <Form modelSchema={simpleFormWithShowSchema} />;
