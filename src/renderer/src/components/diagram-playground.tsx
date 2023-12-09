import 'reactflow/dist/style.css'
import {
  addEdge,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
  Panel,
  ReactFlow,
  useReactFlow
} from 'reactflow'
import { CustomNode } from './custom-node'
import { useCallback, useEffect, useState } from 'react'
import Dagre from '@dagrejs/dagre'
import { Maximize, Target, ZoomIn, ZoomOut } from 'react-feather'
import { SimpleFloatingEdge } from './custom-edge'

interface DiagramPlaygroundProps {
  elements: any[]
  edges: any[]
}

const nodeTypes = {
  custom: CustomNode
}

const edgeTypes = {
  floating: SimpleFloatingEdge
}

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (nodes: any[], edges: any[], options: any) => {
  g.setGraph({ rankdir: options.direction })

  edges.forEach((edge) => g.setEdge(edge.source, edge.target))
  nodes.forEach((node) => g.setNode(node.id, node))

  Dagre.layout(g)

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id)

      return { ...node, position: { x, y } }
    }),
    edges
  }
}

const fitViewOptions = { padding: 4 }

export function DiagramPlayground(props: DiagramPlaygroundProps) {
  const { fitView, zoomIn, zoomOut } = useReactFlow()
  const [nodes, setNodes] = useState(() => props.elements)
  const [edges, setEdges] = useState(() => props.edges)
  const [layouted, setLayouted] = useState(false)

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   []
  // )

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction })

      setNodes([...layouted.nodes])
      setEdges([...layouted.edges])
      setLayouted(true)

      window.requestAnimationFrame(() => {
        fitView()
      })
    },
    [nodes, edges]
  )

  useEffect(() => {
    if (layouted) {
      return () => {}
    }
    const tm = setTimeout(() => {
      onLayout('TB')
    }, 10_000)
    return () => {
      clearTimeout(tm)
    }
  }, [layouted, onLayout])

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    []
  )

  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <ReactFlow
        onConnect={onConnect}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Panel position="bottom-left">
          <button className="btn btn-sm btn-ghost btn-circle" onClick={() => fitView()}>
            <Maximize />
          </button>
          <button className="btn btn-ghost btn-circle" onClick={() => onLayout('TB')}>
            <Target />
          </button>
          <button className="btn btn-ghost btn-circle" onClick={() => zoomIn({ duration: 800 })}>
            <ZoomIn />
          </button>
          <button className="btn btn-ghost btn-circle" onClick={() => zoomOut({ duration: 800 })}>
            <ZoomOut />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}
