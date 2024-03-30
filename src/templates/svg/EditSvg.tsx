import { FC } from 'react'
import { BaseSvgAttributes } from './BaseSvgAttributes.ts'

const EditSvg: FC<BaseSvgAttributes> = ({ color = '#000000', ...props }) => {
  return (
    <svg
      viewBox="0 -0.5 21 21"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill={color}
      {...(props ? props : {})}
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-99.000000, -400.000000)" fill={color}>
          <g transform="translate(56.000000, 160.000000)">
            <path
              d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z"
              id="edit-[#1479]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default EditSvg
