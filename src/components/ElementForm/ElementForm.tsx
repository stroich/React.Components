import { FC } from 'react';

interface ElementFormProps {
  id: string;
  value: string;
}

const ElementForm: FC<ElementFormProps> = ({ id, value }) => {
  return (
    <p>
      <strong>{id}:</strong> {value}
    </p>
  );
};

export default ElementForm;
