import * as React from "react";

const FileDuoToneBlack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect
      x="4"
      y="4"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <path
      d="M7 7H13"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <path
      d="M7 10H13"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <path
      d="M7 13H11"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
  </svg>
);

export default FileDuoToneBlack;
