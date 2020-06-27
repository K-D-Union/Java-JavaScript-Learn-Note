module.exports = {
    base: '/Java-JavaScript-Learn-Note/',
    title: 'K-D-Union',
    description: 'Welcome to K-D-Union\'\s World',
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
        repo: 'https://github.com/K-D-Union/Java-JavaScript-Learn-Note.git',
        repoLabel: 'Github',
        lastUpdated: '最近更新时间',
        smoothScroll: true,
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
            {
                text: '前端框架',
                items: [{
                    text: 'Vue',
                    link: '/Vue/'
                }, {
                    text: 'TypeScript',
                    link: '/TypeScript/'
                }, {
                    text: 'React',
                    link: '/React/'
                }]
            },
        ],
    },
    plugins: ['@vuepress/active-header-links', '@vuepress/back-to-top', '@vuepress/nprogress'],
}