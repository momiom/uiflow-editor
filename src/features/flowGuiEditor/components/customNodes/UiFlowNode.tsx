import React from 'react'
import { Handle, Position } from 'reactflow'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'

type Props = {
  data: UiFlowNodeProps
  id: string
}
type UiFlowNodeProps = {
  title: string
  sees: string[]
  do: string[]
}

const bgColor = 'gray-900'

function SectionWithTitle({
  title,
  textSize = 'sm',
  children,
}: {
  title: string
  textSize?: 'xs' | 'sm'
  children?: React.ReactNode
}) {
  return (
    <div className={`min-w-[10em] rounded border-4 border-t-0 border-${bgColor}`}>
      <h2
        className={cn(
          'm-[-1px] mt-0 px-3 py-2 text-center text-xs font-bold text-white',
          `text-${textSize}`,
          `bg-${bgColor}`,
        )}
      >
        {title}
      </h2>
      <div className="min-h-[1rem]">{children}</div>
    </div>
  )
}

function SubSection({ title, data }: { title: string; data: string[]; children?: React.ReactNode }) {
  return (
    <SectionWithTitle title={title} textSize="xs">
      <ul>
        {data.length === 0 && (
          <li className="relative px-4 py-2 text-center text-sm">
            <ElementInput />
          </li>
        )}

        {data.map((item, i) => (
          <li
            className={cn(
              data.length - 1 !== i ? `border-b-4 border-${bgColor}` : '',
              'relative px-4 py-2 text-center text-sm',
            )}
            key={item}
          >
            <Handle className="customHandleLeft" position={Position.Left} type="target" />
            <ElementInput value={item} />
            <Handle className="customHandleRight" position={Position.Right} type="source" />
          </li>
        ))}
      </ul>
    </SectionWithTitle>
  )
}

function ElementInput({ value }: { value?: string }) {
  return (
    <div>
      <input
        type="text"
        placeholder="テキストを入力..."
        value={value}
        style={{ width: `${value?.length}em` }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
    </div>
  )
}
export default function UiFlowNode({ data, id }: Props) {
  return (
    <div className="rounded border-4 border-t-0 border-gray-900 bg-white">
      <h1 className="m-[-1px] mt-0 bg-gray-900 px-3 py-1 text-center text-sm font-bold text-white">{data.title}</h1>
      <div className="flex min-h-[1rem] flex-col gap-4 px-2 pb-3 pt-4">
        <SubSection title="ユーザーが見るもの" data={data.sees} />
        <SubSection title="ユーザーがすること" data={data.do} />
      </div>
    </div>
  )
}
