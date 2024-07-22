import React from 'react';
import { FormInputLabel, Group, Input } from './form-input.styles';


type FormInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;


const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
