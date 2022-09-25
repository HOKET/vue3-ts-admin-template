export interface FlowData {
  id: string
  type: string
  title: string
  content: string
  parentId: string | null
  childNode?: FlowData
}
export interface StepData {
  stepId: string
  stepType: string
  title: string
  [propName: string]: any
}

export interface FormItemPermissionData {
  id: string
  name: string
  permission: number //permission 0|可操作  1|只读（默认）  2|隐藏
}
