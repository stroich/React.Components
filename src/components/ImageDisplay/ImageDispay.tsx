import { FC } from 'react';

interface ImageDisplayProps {
  image: string;
}

export const ImageDisplay: FC<ImageDisplayProps> = ({ image }) => {
  return (
    <div>
      {image && (
        <img
          src={image}
          alt="Preview"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '5px',
          }}
        />
      )}
    </div>
  );
};
