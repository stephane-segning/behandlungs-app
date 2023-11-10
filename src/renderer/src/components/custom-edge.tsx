// Code copied from https://reactflow.dev/examples/edges/simple-floating-edges

import { useCallback, useMemo } from 'react'
import { BaseEdge, EdgeProps, getBezierPath, useStore } from 'reactflow'
import { getEdgeParams } from './utils/edges'

export function SimpleFloatingEdge({ id, source, target, markerEnd, style, data }: EdgeProps) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]))
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]))

  const res = useMemo(() => {
    if (!sourceNode || !targetNode) {
      return null
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode)

    return getBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      targetX: tx,
      targetY: ty
    })
  }, [sourceNode, targetNode])

  if (!res) {
    return null
  }

  const [edgePath, labelX, labelY] = res

  return (
    <BaseEdge
      labelX={labelX}
      labelY={labelY}
      label={data?.name ?? ''}
      markerEnd={markerEnd}
      style={style}
      id={id}
      path={edgePath}
    />
  )
}
