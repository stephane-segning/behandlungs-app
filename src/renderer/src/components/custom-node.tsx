import { Handle, Position } from 'reactflow'
import { ThumbsDown, ThumbsUp } from 'react-feather'
import { memo, useMemo } from 'react'

interface CustomNodeProps {
  data: any
}

function KuNode({ data }: CustomNodeProps) {
  const savingZone: string | null = useMemo(() => {
    const d = data.data ?? ''
    try {
      const parsedData = JSON.parse(d)
      if (parsedData?.save_zone) {
        return parsedData.save_zone
      }
    } catch (e) {
      console.warn(e)
    }
    return null
  }, [data])

  const isDigital = useMemo(() => {
    return !savingZone || savingZone === 'digital'
  }, [savingZone])

  return (
    <div className="px-4 py-2 m-4 shadow-md rounded-md bg-white">
      <div className="flex">
        {isDigital && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-green-500">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
        )}
        {!isDigital && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-red-500">
            <ThumbsDown className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="ml-2">
          <div className="text-lg font-bold">{data.flow?.name}</div>
          <div className="text-gray-500">{data.flow?.type?.name}</div>
          {savingZone && (
            <div className="mt-2">
              Speicherort <kbd className="kbd kbd-sm">{savingZone}</kbd>
            </div>
          )}
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
