import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useDb } from '../hooks/db'
import { useSelector } from 'react-redux'
import { selectDbEdges, selectDbSteps } from '../hooks/db.slice'
import { DiagramPlayground } from '../components/diagram-playground'
import { Edge, MarkerType, ReactFlowProvider } from 'reactflow'

export function StepDiagram() {
  const { getEdges, getFlowCaseStepViews } = useDb()

  useEffect(() => {
    getEdges()
  }, [])

  const steps = useSelector(selectDbSteps)
  const edges = useSelector(selectDbEdges)

  const { caseId } = useParams<{ caseId: string }>()
  useEffect(() => {
    if (caseId === '') {
      return
    }

    getFlowCaseStepViews({ caseId })
  }, [caseId])

  const flowElements = useMemo(
    () =>
      steps.map((step, index) => ({
        id: step.flow?.id,
        type: 'custom',
        data: step,
        position: { x: 0, y: index * 100 }
      })),
    [steps]
  )

  const edgesElements = useMemo(() => {
    const elMap = flowElements.reduce((acc, step) => ({ ...acc, [step.id]: step }), {})

    return edges
      .filter(
        (item) =>
          item.startNode?.id &&
          item.startNode?.id in elMap &&
          item.endNode?.id &&
          item.endNode?.id in elMap
      )
      .map(
        (edge) =>
          ({
            id: edge.id,
            source: edge.startNode.id,
            target: edge.endNode.id,
            // animated: true,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
            data: edge
          }) as Edge
      )
  }, [edges, steps])

  if (flowElements.length === 0) {
    return (
      <div className="text-center">
        <div>No steps</div>
      </div>
    )
  }

  return (
    <ReactFlowProvider>
      <DiagramPlayground elements={flowElements} edges={edgesElements} />
    </ReactFlowProvider>
  )
}
