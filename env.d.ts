/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 声明Vue组件的类型
  const component: DefineComponent<{}, {}, any>
  export default component
}