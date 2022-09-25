export interface FlowData {
  id: string
  type: string
  title: string
  content: string
  parentId: string | null
  childNode?: FlowData
}
