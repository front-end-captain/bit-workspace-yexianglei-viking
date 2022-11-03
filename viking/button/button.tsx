import React, { ReactNode, CSSProperties } from 'react';

export type ButtonProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;

  /**
   * css style
   */
  style?: CSSProperties;
};

export function Button({ children, style }: ButtonProps) {
  return <div style={style}>{children}</div>;
}
