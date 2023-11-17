import { FC } from 'react';

interface LoadingProps {
  classname: string;
}

const Loading: FC<LoadingProps> = ({ classname }) => {
  return <div className={classname}>loading...</div>;
};

export default Loading;
