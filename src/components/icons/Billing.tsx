import * as React from "react";

const CreditCard = (props: React.SVGProps<SVGSVGElement>) => (
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
      x="3"
      y="6"
      width="14"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <rect x="6" y="11" width="3" height="1.5" rx="0.75" fill="currentColor" />
    <path d="M3 9H17" stroke="currentColor" strokeWidth={1.2} />
  </svg>
);

export default CreditCard;
