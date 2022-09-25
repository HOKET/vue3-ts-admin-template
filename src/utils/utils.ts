export default class Utils {
  // 获取随机数
  static getRandomMs (): string {
    return new Date().getTime() + '_' + Math.ceil(Math.random() * 99999);
  }

  // 获取叶子节点数据
  static findTreeLeef<T> (
    nodeData: T | any,
    keyName: string,
    val: any,
    childKey: string
  ): T | null {
    if (nodeData[keyName] === val) {
      return nodeData;
    } else {
      return Utils.findTreeLeef(nodeData[childKey], keyName, val, childKey);
    }
  }
}
