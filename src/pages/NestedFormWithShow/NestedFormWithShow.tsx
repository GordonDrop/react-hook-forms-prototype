import React from 'react';
import Form from '../../Form';
import { nestedFormWithShowSchema } from './nested-form-with-show.schema';

export const NestedFormWithShow: React.FC = () => <Form modelSchema={nestedFormWithShowSchema} />;
