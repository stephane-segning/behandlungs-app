import { Handle, Position } from 'reactflow'
import { List, ThumbsDown, ThumbsUp } from 'react-feather'
import { memo, useMemo } from 'react'

interface CustomNodeProps {
  data: { flow: any; data?: Record<string, any> }
}

function KuNode({ data }: CustomNodeProps) {
  const parsedData = data.data ?? {}

  const savingZone: string | null = useMemo(
    () => parsedData.save_zone ?? null,
    [parsedData.save_zone]
  )

  const metaData = useMemo(() => {
    return Object.keys(parsedData).map((key) => (
      <div className="w-auto" key={`json-item-key-${key}`}>
        <div className="mt-2">
          {key} <kbd className="kbd kbd-sm">{parsedData[key]}</kbd>
        </div>
      </div>
    ))
  }, [parsedData])

  const isSameName = useMemo(() => {
    return data.flow?.name === data.flow?.type?.name
  }, [data.flow?.name, data.flow?.type?.name])

  return (
    <div className="px-4 py-2 m-4 shadow-md rounded-md bg-white">
      <div className="flex">
        {savingZone === 'digital' && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-green-500">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
        )}
        {savingZone && savingZone !== 'digital' && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-red-500">
            <ThumbsDown className="w-6 h-6 text-white" />
          </div>
        )}
        {!savingZone && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-primary-content">
            <List className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="ml-2">
          <div className="text-lg font-bold">{data.flow?.name}</div>
          {!isSameName && <div className="text-gray-500">{data.flow?.type?.name}</div>}
          {metaData}
        </div>
      </div>

      <Handle
        style={{ width: '12px', height: '12px' }}
        type="source"
        position={Position.Top}
        id="a"
        className="!bg-gray-500 !border-none"
      />
      <Handle
        style={{ width: '12px', height: '12px' }}
        type="source"
        position={Position.Right}
        id="b"
        className="!bg-gray-500 !border-none"
      />
      <Handle
        style={{ width: '12px', height: '12px' }}
        type="source"
        position={Position.Bottom}
        id="c"
        className="!bg-gray-500 !border-none"
      />
      <Handle
        style={{ width: '12px', height: '12px' }}
        type="source"
        position={Position.Left}
        id="d"
        className="!bg-gray-500 !border-none"
      />
    </div>
  )
}

export const CustomNode = memo(KuNode)
