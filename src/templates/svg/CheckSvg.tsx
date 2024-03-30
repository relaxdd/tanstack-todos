import { FC } from 'react'
import { BaseSvgAttributes } from './BaseSvgAttributes.ts'

const CheckSvg: FC<BaseSvgAttributes> = ({ color = '#000000', ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(props ? props : {})}
    >
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export default CheckSvg
