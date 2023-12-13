import React, { type Dispatch, useCallback } from 'react'
import { type Node, type Edge } from 'reactflow'
import { Button } from '~/components/ui/button'
import { getLayoutedElements } from '~/lib/flow'

export default function FormatButton({
  nodes,
  edges,
  setNodes,
  setEdges,
}: {
  nodes: Node[]
  edges: Edge[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNodes: Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>
}) {
  const onClick = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges)

    setNodes([...layoutedNodes])
    setEdges([...layoutedEdges])
  }, [nodes, edges])
  return <Button onClick={onClick}>Format</Button>
}
