import React, { ReactNode } from 'react';

export type LinkProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Link({ children }: LinkProps) {
  return (
    <div>
      {children}
    </div>
  );
}
