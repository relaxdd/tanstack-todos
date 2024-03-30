import { FC } from 'react'
import { BaseSvgAttributes } from './BaseSvgAttributes.ts'

const CloseSvg: FC<BaseSvgAttributes> = ({ color = '#000000', ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...(props ? props : {})}
    >
      <g stroke={color} strokeLinecap="round" strokeWidth="2">
        <path d="M6 18L18 6"></path>
        <path d="M18 18L6 6"></path>
      </g>
    </svg>
  )
}

export { CloseSvg }
