/*
 * @Date: 2020-03-10 14:29:49
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-10 15:27:11
 */

interface StyleType {
  [key: string]: string;
}

declare module '*.scss?modules' {
  const style: StyleType;
  export default style;
}
