interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {

    import { ComponentOptions } from 'vue'

    const componentOptions: ComponentOptions

    export default componentOptions

}