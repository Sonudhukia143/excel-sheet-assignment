declare module 'react-resizable' {
  import * as React from 'react';
  export interface ResizableBoxProps {
    width: number;
    height: number;
    axis?: 'x' | 'y' | 'both';
    minConstraints?: [number, number];
    maxConstraints?: [number, number];
    handle?: React.ReactNode;
    onResizeStop?: (e: unknown, data: { size: { width: number; height: number } }) => void;
    className?: string;
    children?: React.ReactNode;
  }
  export class ResizableBox extends React.Component<ResizableBoxProps> {}
} 