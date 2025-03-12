import {RSSOptions, RssPlugin} from "vitepress-plugin-rss";
import { withMermaid } from "vitepress-plugin-mermaid";
import fs from 'fs';
import path from 'path';

// https://vitepress.dev/reference/site-config
// const baseUrl = 'https://2214372851.github.io';
const baseUrl = 'https://yundocs.pages.dev';
const RSS: RSSOptions = {
    title: 'YunDocs',
    description: 'YunDocs | Documented study notes have been developed for module documentation',
    baseUrl: baseUrl,
    copyright: 'Copyright © 2023-present Yun'
}
const aiDir = path.resolve(__dirname, '../ai'); // 确保路径正确
const aiFiles = fs.readdirSync(aiDir).filter((file) => file.endsWith('.md'));
export default withMermaid({
    title: "YunDocs",
    // base: '/YunDocs/',
    base: '/',
    description: "YunDocs | Documented study notes have been developed for module documentation",
    vite: {
        plugins: [
            RssPlugin(RSS)
        ]
    },
    markdown: {
        // lineNumbers: true,
    },
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/logo.jpg'}],
        ['link', {rel: 'icon', type: 'image/png', href: '/logo.jpg'}],
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
            },
            {
                text: 'AI',
                link: '/ai'
            }
        ],

        sidebar: {
            '/modules': [
                {
                    text: 'Crawlsy',
                    collapsed: true,
                    items: [
                        {
                            text: '简介',
                            link: '/modules/crawlsy'
                        }
                    ]
                },
                {
                    text: 'Yun Download',
                    collapsed: true,
                    items: [
                        {
                            text: '简介',
                            link: '/modules/yundownload'
                        },
                        {
                            text: '快速入门',
                            link: '/modules/yundownload/quickstart'
                        }
                    ]
                },
                {
                    text: 'Crawlsy Spider',
                    collapsed: true,
                    items: [
                        {
                            text: '简介',
                            link: '/modules/crawlsy-spider'
                        }
                    ]
                },
                {
                    text: 'Job Hive',
                    collapsed: true,
                    items: [
                        {
                            text: '简介',
                            link: '/modules/job-hive'
                        }
                    ]
                },
                {
                    text: 'D0 Tools',
                    collapsed: true,
                    items: [
                        {
                            text: 'Github',
                            link: 'https://github.com/2214372851/D0-Tools'
                        }
                    ]
                }
            ],
            '/study': [
                {
                    text: 'Tools',
                    collapsed: true,
                    items: [
                        {text: 'AI', link: '/study/Tools/AI'},
                        {text: '文章', link: '/study/Tools/文章'},
                        {text: '常用命令', link: '/study/Tools/常用命令'},
                        {text: '网页工具', link: '/study/Tools/网页工具'},

                    ]
                },
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
                        {text: 'Vue简查', link: '/study/Web/Vue简查'},
                    ]
                },
                {
                    text: 'Rust',
                    collapsed: true,
                    items: [
                        {text: 'Rust', link: '/study/Rust/Rust'},
                        {text: 'Rust简记', link: '/study/Rust/Rust简记'}
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
            ],
            '/ai': [
                {
                    text: 'AI 笔记',
                    collapsed: true,
                    items: aiFiles.map((file) => {
                        const fileName = file.replace('.md', '');
                        return {
                            text: fileName, // 显示的文本
                            link: `/ai/${fileName}`, // 对应的路径
                        };
                    })
                }
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
        lastUpdated: {
            text: "上次更新"
        },
        editLink: {
            pattern: 'https://github.com/2214372851/YunDocs/blob/main/:path'
        },

    }
})
