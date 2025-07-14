import * as React from "react";

const Bell = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M10 17a2 2 0 0 0 2-2H8a2 2 0 0 0 2 2Z" fill="currentColor" />
    <path
      d="M16 14V9a6 6 0 1 0-12 0v5l-1 1v1h14v-1l-1-1Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default Bell;
