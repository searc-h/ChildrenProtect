const CracoLessPlugin = require('craco-less');

module.exports = {
    // 修改默认颜色
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#FFCC00' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    /*babel 这里是新增的 ， 自动按需引入antD样式 */
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    }
    /*新增结束*/
};
