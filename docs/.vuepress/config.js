module.exports = {
    title: 'Sperman-Yuan',
    description: 'Welcome to the world of Java',
    cache: false,
    head: [
        ['link', {
            rel: 'icon',
            href: '/icon.jpg'
        }]
    ],
    // 其它配置
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        sidebar: 'auto',
        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: 'Java基础',
                link: '/JavaIndex/'
            },
            {
                text: 'Java框架',
                items: [{
                    text: 'Spring',
                    link: '/Spring/'
                }, {
                    text: 'SpringMVC',
                    link: '/SpringMVC/'
                }, {
                    text: 'SpringBoot',
                    link: '/SpringBoot/'
                }, {
                    text: 'SpringCloud',
                    link: '/SpringCloud/'
                }]
            },
            {
                text: 'Java源码',
                link: '/JavaSoundCode/'
            },
        ],
    }
}