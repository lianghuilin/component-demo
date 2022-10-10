export const pieOption = {
    tooltip: {
        show: false,
        trigger: 'item',
    },
    legend: {
        show: false,
    },
    title: {
        text: '性别',
        x: 'center',
        y: 'center',
        textStyle: {
            color: '#999',
            fontSize: 16,
        },
    },
    series: [
        {
            type: 'pie',
            dataType: 'temp',
            radius: [0, '60%'],
            label: {
                position: 'center',
                fontSize: 12,
            },
            data: [
                // 这个value是虚拟的，可以随意定义
                { value: 100, name: '' },
            ],
            itemStyle: {
                color: 'rgba(255, 255, 255, 0.08)',
            },
            labelLine: {
                show: false,
            },
            selectedMode: false,
            avoidLabelOverlap: false,
            silent: true,
        },
        {
            type: 'pie',
            dataType: 'temp',
            radius: ['70%', '73%'],
            selectedMode: false,
            avoidLabelOverlap: false,
            silent: true,
            label: {
                show: false,
            },
            data: [
                // 这个value是虚拟的，可以随意定义
                { value: 100, name: '' },
            ],
            itemStyle: {
                color: 'rgba(212, 222, 236, 0.5)',
            },
            labelLine: {
                show: false,
            },
        },
        {
            type: 'pie',
            dataType: 'really',
            radius: ['74%', '94%'],
            selectedMode: false,
            avoidLabelOverlap: false,
            silent: true,
            minShowLabelAngle: 10,
            label: {
                show: false,
            },
            itemStyle: {
                borderColor: '#132038',
                borderWidth: 3,
                borderRadius: 1,
            },
            labelLine: {
                show: false,
            },
            data: [],
        },
        {
            type: 'pie',
            dataType: 'temp',
            radius: ['95%', '98%'],
            label: {
                show: false,
            },
            itemStyle: {
                color: 'rgba(212, 222, 236, 0.5)',
            },
            data: [
                // 这个value是虚拟的，可以随意定义
                { value: 100, name: '' },
            ],
            labelLine: {
                show: false,
            },
        },
    ],
}
