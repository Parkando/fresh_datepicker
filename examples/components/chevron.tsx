import { JSX } from "preact";

export type Direction = "left" | "right" | "up" | "down";

interface Props {
  svgProps?: JSX.SVGAttributes<SVGSVGElement>;
  direction: Direction;
  color?: string;
}

export function Chevron({ color = "black", ...props }: Props) {
  let path: JSX.Element | null = null;

  switch (props.direction) {
    case "left": {
      path = (
        <g>
          <path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z"></path>
        </g>
      );
      break;
    }
    case "right": {
      path = (
        <g>
          <path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"></path>
        </g>
      );
      break;
    }
    case "up": {
      path = (
        <g>
          <path d="M12 8l-6 6 1.41 1.41 4.59-4.58 4.59 4.58 1.41-1.41z"></path>
        </g>
      );

      break;
    }
    case "down": {
      path = (
        <g>
          <path d="M16.59 8.59l-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6z"></path>
        </g>
      );

      break;
    }
  }

  return (
    <svg {...props.svgProps} stroke={color} fill={color} viewBox="2 2 20 20">
      {path}
    </svg>
  );
}
