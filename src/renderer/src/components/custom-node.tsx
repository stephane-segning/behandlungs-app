import { Handle, Position } from 'reactflow'
import { List, ThumbsDown, ThumbsUp } from 'react-feather'
import { memo, useMemo } from 'react'

interface CustomNodeProps {
  data: { flow: any; data?: Record<string, any> }
}

const translations = {
  speicher_ort: 'Speicherort',
  data: 'Daten'
}

function KuNode({ data }: CustomNodeProps) {
  const parsedData = data.data ?? {}

  const isDigital: string | null = useMemo(() => {
    const savingZone = parsedData.speicher_ort ?? null
    if (!savingZone) return null
    if (savingZone.includes('digital')) return 'digital'
    if (savingZone.includes('kis')) return 'digital'
    return 'physical'
  }, [parsedData.speicher_ort])

  const metaData = useMemo(() => {
    return Object.keys(parsedData).map((key) => (
      <li key={`json-item-key-${key}`}>
        {translations[key] ?? key} <kbd className="kbd kbd-sm">{parsedData[key]}</kbd>
      </li>
    ))
  }, [parsedData])

  const isSameName = useMemo(() => {
    return data.flow?.name === data.flow?.type?.name
  }, [data.flow?.name, data.flow?.type?.name])

  return (
    <div className="px-4 py-2 m-4 shadow-md rounded-md bg-white">
      <div className="flex items-center">
        {isDigital === 'digital' && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-green-500">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
        )}
        {isDigital === 'physical' && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-red-500">
            <ThumbsDown className="w-6 h-6 text-white" />
          </div>
        )}
        {!isDigital && (
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-primary-content">
            <List className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="ml-2">
          <div className="text-lg font-bold">{data.flow?.name}</div>
          {!isSameName && <div className="text-gray-500">{data.flow?.type?.name}</div>}

          {metaData && <ul className="list-disc ml-5">{metaData}</ul>}
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
