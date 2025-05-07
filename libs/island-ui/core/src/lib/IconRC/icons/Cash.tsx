import * as React from 'react'
import type { SvgProps as SVGRProps } from '../types'

const SvgCash = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <rect
        x="32"
        y="80"
        width="448"
        height="256"
        rx="16"
        ry="16"
        transform="translate(512 416) rotate(180)"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <line
        x1="64"
        y1="384"
        x2="448"
        y2="384"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <line
        x1="96"
        y1="432"
        x2="416"
        y2="432"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <circle
        cx="256"
        cy="208"
        r="80"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <path
        d="M480,160a80,80,0,0,1-80-80"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <path
        d="M32,160a80,80,0,0,0,80-80"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <path
        d="M480,256a80,80,0,0,0-80,80"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
      <path
        d="M32,256a80,80,0,0,1,80,80"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 32,
        }}
      />
    </svg>
  )
}

export default SvgCash
