import dagre from 'dagre'
import { type Node, type Edge, Position } from 'reactflow'

export const markdownToNodesAndEdges = (markdownString: string): { nodes: Node[]; edges: Edge[] } => {
  const lines = markdownString.split('\n')
  const nodes: Node[] = []
  const edges: Edge[] = []
  const levelMap: Record<number, string> = {}

  lines.forEach((line, index) => {
    const levelMatch = line.match(/^#+/)
    if (levelMatch) {
      const level = levelMatch[0].length
      const text = line.slice(level + 1).trim()

      if (text) {
        const nodeId = `n${index}`
        levelMap[level] = nodeId

        const node: Node = {
          id: nodeId,
          data: { label: text },
          position: { x: 0, y: 0 },
        }

        nodes.push(node)

        if (level > 1) {
          const parentLevel = level - 1
          const parentNodeId = levelMap[parentLevel]
          if (parentNodeId) {
            const edgeId = `e${parentNodeId}-${nodeId}`
            const edge: Edge = {
              id: edgeId,
              source: parentNodeId,
              target: nodeId,
              animated: true,
            }
            edges.push(edge)
          }
        }
      }
    }
  })

  return { nodes, edges }
}

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((n) => {
    dagreGraph.setNode(n.id, { width: n.width, height: n.height })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((n) => {
    const nodeWithPosition = dagreGraph.node(n.id)
    const newNode: Node = {
      ...n,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - n.width! / 2,
        y: nodeWithPosition.y - n.height! / 2,
      },
    }
    return newNode
  })

  return { nodes: newNodes, edges }
}
