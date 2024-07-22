import React from 'react';

export type IconButtonProps = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  [key: string]: any;
};

export default function IconButton(props: IconButtonProps) {
  const { name, onClick, children, ...rest } = props;

  return (
    <button name={name} type="button" onClick={onClick} {...rest}>
      <span className="hidden">{name}</span>
      {children}
    </button>
  );
}
