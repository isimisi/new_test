/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React from 'react';

const ContactFormExample = ({ fields = [], recipientId }) => (
  <form
    onSubmit={(e) => {
      const formData = new FormData(e.currentTarget);
      const formProps = Object.fromEntries(formData);
      alert(`would send contact form to ${recipientId}.\n
${Object.keys(formProps)
    .map((key) => `${key}: ${formProps[key]}`)
    .join('\n')}
        `);
      e.preventDefault();
    }}
    style={{
      border: '1px solid black',
      padding: 10,
    }}
  >
    {fields.map((field, index) => (
      <label key={field.name ?? index}>
        {field.label}
        {' '}
        {field.required ? '*' : ''}
        <br />
        <input
          type={field.type}
          required={field.required}
          name={field.name}
        />
        <br />
      </label>
    ))}
    <button type="submit">Submit</button>
  </form>
);

export default ContactFormExample;
