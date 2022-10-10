import dataJson from './data.json'
export const columnsItem = {
    key: '',
    label: '',
    align: 'left',
    width: 50,
    labelStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 300,
        fontFamily: 'sans-serif'
    }
}
export const rowsItem = {
    background: '#003B51'
}
export const option = {
    dataset: [...dataJson],
    indexConfig: {
        show: false,
        label: '排名',
        key: 'index',
        align: 'center',
        width: 30,
        labelStyle: {
            fontSize: 14,
            color: '#fff',
            fontWeight: 300,
            fontFamily: 'sans-serif'
        },
    },
    headers: {
        show: true,
        height: 32,
        background: 'rgba(95,159,233,.12)',
        textStyle: {
            fontSize: 14,
            color: 'hsla(0,0%,100%,.65)',
            fontWeight: 200,
            fontFamily: 'sans-serif',
        },
    },
    columns: [
        {
            key: 'date',
            label: '日期',
            align: 'center',
            width: 50,
            labelStyle: {
                fontSize: 14,
                color: 'hsla(0,0%,100%,.65)',
                fontWeight: 300,
                fontFamily: 'sans-serif',
            },
        },
        {
            key: 'product',
            label: '产品',
            align: 'center',
            width: 50,
            labelStyle: {
                fontSize: 14,
                color: 'hsla(0,0%,100%,.65)',
                fontWeight: 300,
                fontFamily: 'sans-serif',
            },
        },
    ],
    rows: [
        {
            background: 'rgba(95,159,233,.12)',
            height: 32
        }
    ],
    waitTime: 2,
    carousel: 'single',
}
