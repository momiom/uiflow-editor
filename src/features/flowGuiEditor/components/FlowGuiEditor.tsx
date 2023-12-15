'use client'

import React, { useCallback } from 'react'
import ReactFlow, {
  type Node,
  type Edge,
  MarkerType,
  useNodesState,
  useEdgesState,
  type OnConnect,
  addEdge,
  Background,
  Panel,
} from 'reactflow'

import UiFlowNode from './customNodes/UiFlowNode'
import FloatingEdge from './customNodes/FloatingEdge'
import CustomConnectionLine from './customNodes/CustomConnectionLine'

import 'reactflow/dist/style.css'
import './customNodes/uiFlowNodeStyle.css'
import FormatButton from './FormatButton'
import SideBar from './SideBar'

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
}

const nodeTypes = {
  uiflow: UiFlowNode,
}

const edgeTypes = {
  floating: FloatingEdge,
}

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'uiflow',
    position: { x: 0, y: 0 },
    data: {
      title: 'ホーム画面',
      sees: ['書籍'],
      do: ['書籍選択', '書籍ダウンロード'],
    },
  },
  {
    id: '2',
    type: 'uiflow',
    position: { x: 300, y: -200 },
    data: {
      title: '書籍閲覧画面',
      sees: ['書面（書籍の中身）', '問題', 'ページ数'],
      do: ['しおりをつける', '問題選択'],
    },
  },
  {
    id: '3',
    type: 'uiflow',
    position: { x: 300, y: 200 },
    data: {
      title: '書籍ダウンロード画面',
      sees: ['ダウンロードの進捗'],
      do: ['ダウンロードのキャンセル'],
    },
  },
]

const initialEdges: Edge[] = []

export const FlowGuiEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback<OnConnect>((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineComponent={CustomConnectionLine}
      connectionLineStyle={connectionLineStyle}
    >
      <Background />
      <Panel position="top-left">
        <SideBar />
      </Panel>
      <Panel position="bottom-left">
        <FormatButton nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
      </Panel>
    </ReactFlow>
  )
}
