/*
 * @Date: 2020-03-10 14:29:49
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-12 20:38:09
 */

interface StyleType {
  [key: string]: string;
}

declare module '*.css?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.scss?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.sass?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.less?modules' {
  const style: StyleType;
  export default style;
}

declare module '*.styl?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.stylus?modules' {
  const style: StyleType;
  export default style;
}
