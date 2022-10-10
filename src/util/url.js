// 获取URL QUERY PARAMS
export const getQueryString = (path, name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
    const r = path.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 根据环境与当前IP端口号来获取HTTP或者WS的BaseUrl
export function getBaseUrl(type) {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const wsUrl = import.meta.env.VITE_WS_URL
    if (baseUrl || wsUrl) {
        return type === 'baseUrl' ? baseUrl : wsUrl
    }

    const { protocol } = location
    const { host } = location
    return protocol === 'https:' ? `wss://${host}` : `ws://${host}`
}

export default {
    getBaseUrl,
}
