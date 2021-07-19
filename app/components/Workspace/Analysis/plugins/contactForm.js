/* eslint-disable react/prop-types */
import React from 'react';

// lazy load to keep initial bundle small
const ContactFormExample = () => import('../components/ContactFormExample');


const contactForm = {
  Renderer: ({ data }) => (
    <ContactFormExample fields={data.fields} recipientId={data.recipientId} />
  ),
  id: 'contact-form',
  title: 'Contact form',
  description: 'A simple, configurable contactform',
  version: 1,
  controls: {
    type: 'autoform',
    columnCount: 1,
    schema: {
      properties: {
        recipientId: {
          type: 'string',
          enum: ['recipient-1', 'recipient-2', 'recipient-3'],
        },
        fields: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
              },
              type: {
                type: 'string',
                enum: ['text', 'number'],
              },
              name: {
                type: 'string',
              },
              required: {
                type: 'boolean',
              },
            },
          },
        },
      },
      required: ['fields', 'recipientId'],
    },
  },
};
export default contactForm;
