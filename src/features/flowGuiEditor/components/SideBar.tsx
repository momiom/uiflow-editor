import UiFlowNode from './customNodes/UiFlowNode'

export default function SideBar() {
  const placeHolder = {
    title: '画面タイトル',
    sees: [],
    do: [],
  }
  return (
    <div className="flex max-w-md flex-col gap-2 rounded bg-slate-500 px-4 py-4">
      <UiFlowNode data={placeHolder} id={''} />
    </div>
  )
}
