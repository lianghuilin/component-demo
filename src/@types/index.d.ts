// mitt.js
declare module "vue" {
    export interface ComponentCustomProperties {
        $emitter: typeof mitter;
    }
}

declare module "@*"


declare module "vue-json-excel3"