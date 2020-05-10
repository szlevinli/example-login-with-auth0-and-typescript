import React, { MouseEvent, FC } from 'react';

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
}

const StatelessComponent: FC<Props> = ({ onClick: handleClick, children }) => {
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

export default StatelessComponent;