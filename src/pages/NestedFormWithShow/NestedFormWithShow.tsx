import React from 'react';
import Form from '../../Form';
import nestedFormWithShowSchema from './nested-form-with-show.schema';

const NestedFormWithShow: React.FC = () => <Form modelSchema={nestedFormWithShowSchema} />;

export default NestedFormWithShow;
