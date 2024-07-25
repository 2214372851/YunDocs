import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "YunDocs",
    base: '/YunDocs/',
    description: "YunDocs | Documented study notes have been developed for module documentation",
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/YunDocs/logo.jpg'}],
        ['link', {rel: 'icon', type: 'image/png', href: '/YunDocs/logo.jpg'}],
        ['meta', {name: 'theme-color', content: '#5f67ee'}],
        // ['meta', {property: 'og:type', content: 'website'}],
        // ['meta', {property: 'og:locale', content: 'en'}],
        // ['meta', {property: 'og:title', content: 'VitePress | Vite & Vue Powered Static Site Generator'}],
        // ['meta', {property: 'og:site_name', content: 'VitePress'}],
        // ['meta', {property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg'}],
        // ['meta', {property: 'og:url', content: 'https://vitepress.dev/'}],
    ],
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '模块',
                link: '/modules'
            },
            {
                text: '记录',
                link: '/study'
            }
        ],

        sidebar: {
            '/modules': [
                {
                    text: 'Yun Download',
                    collapsed: true,
                    items: [
                        {
                            text: '简介',
                            link: '/modules/yundownload'
                        },
                        {
                            text: '快速入门(v2)',
                            link: '/modules/yundownload/v2-quickstart'
                        },
                        {
                            text: '快速入门(v3)',
                            link: '/modules/yundownload/v3-quickstart'
                        },
                    ]
                },
            ],
            '/study': [
                {
                    text: 'Python',
                    collapsed: true,
                    items: [
                        {text: 'Python基础', link: '/study/Python/Python基础'},
                        {text: 'Python简查', link: '/study/Python/Python简查'},
                        {text: '设计模式', link: '/study/Python/设计模式'},
                        {text: 'Django', link: '/study/Python/Django'},
                        {text: 'Django REST framework', link: '/study/Python/Django REST framework'},
                        {text: 'FastAPI', link: '/study/Python/FastAPI'},
                        {text: 'DrissionPage', link: '/study/Python/DrissionPage'},
                        {text: 'gRPC', link: '/study/Python/gRPC'},
                        {text: 'PySide', link: '/study/Python/PySide'},
                        {text: 'Numpy与Pandas', link: '/study/Python/Numpy与Pandas'},
                        {text: 'Matplotlib', link: '/study/Python/Matplotlib'},
                    ]
                },
                {
                    text: 'Web',
                    collapsed: true,
                    items: [
                        {text: 'HTML', link: '/study/Web/HTML'},
                        {text: 'HTML标签参考', link: '/study/Web/HTML标签参考'},
                        {text: 'JavaScript', link: '/study/Web/JavaScript'},
                        {text: 'jQuery', link: '/study/Web/jQuery'},
                        {text: 'TypeScript', link: '/study/Web/TypeScript'},
                        {text: 'Vue', link: '/study/Web/Vue'},
                    ]
                },
                {
                    text: 'Rust',
                    collapsed: true,
                    items: [
                        {text: 'Rust', link: '/study/Rust/Rust'}
                    ]
                },
                // {
                //     text: 'C语言',
                //     items: [
                //         {text: 'C++', link: '/study/C/C++'}
                //     ]
                // },
                {
                    text: 'Golang',
                    collapsed: true,
                    items: [
                        {text: 'Golang', link: '/study/Golang/Golang'}
                    ]
                },
                {
                    text: '数据库',
                    collapsed: true,
                    items: [
                        {text: 'MySQL', link: '/study/Database/MySQL'},
                        {text: 'Redis', link: '/study/Database/Redis'},
                    ]
                },
                {
                    text: '开发工具',
                    collapsed: true,
                    items: [
                        {text: 'Docker', link: '/study/Dev/Docker'},
                        {text: 'Git', link: '/study/Dev/Git'},
                        {text: 'Nginx', link: '/study/Dev/Nginx'},
                    ]
                },
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/2214372851'}
        ],

        outline: {
            level: [2, 4],
            label: '当前页大纲'
        },
        docFooter: {
            prev: '上一篇',
            next: '下一篇',
        },

    }
})
