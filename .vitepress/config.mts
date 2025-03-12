import {RSSOptions, RssPlugin} from "vitepress-plugin-rss";
import {withMermaid} from "vitepress-plugin-mermaid";
import fs from 'fs';
import path from 'path';

// 动态读取目录函数
function getDirFiles(dirPath: string, ext: string = '.md') {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(ext));
    let flag = 'repo'
    if (!dirPath.includes(flag)) {
        flag = 'YunHai-Docs'
    }
    return files.map(file => ({
        text: file.replace(ext, ''),
        link: `${dirPath.split(flag)[1].replace(/\\/g, '/')}/${file.replace(ext, '')}`
    }));
}

function getNestedDirs(basePath: string) {
    const dirs = fs.readdirSync(basePath, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return dirs.map(dir => {
        const fullPath = path.join(basePath, dir);
        const files = getDirFiles(fullPath);
        return {
            text: dir,
            collapsed: true,
            items: files
        };
    });
}

// https://vitepress.dev/reference/site-config
// const baseUrl = 'https://2214372851.github.io';
const baseUrl = 'https://yundocs.pages.dev';
const RSS: RSSOptions = {
    title: 'YunDocs',
    description: 'YunDocs | Documented study notes have been developed for module documentation',
    baseUrl: baseUrl,
    copyright: 'Copyright © 2023-present Yun'
}
// 获取各个目录的文件
const aiDir = path.resolve(__dirname, '../ai');
const studyDir = path.resolve(__dirname, '../study');
const modulesDir = path.resolve(__dirname, '../modules');

const aiFiles = fs.readdirSync(aiDir).filter((file) => file.endsWith('.md') && !file.startsWith('index'));
const studySections = getNestedDirs(studyDir);
const modulesSections = fs.readdirSync(modulesDir)
    .filter(dir => fs.statSync(path.join(modulesDir, dir)).isDirectory())
    .map(dir => {
        const dirPath = path.join(modulesDir, dir);
        const files = fs.readdirSync(dirPath)
            .filter(file => file.endsWith('.md'))
            .map(file => ({
                text: file === 'index.md' ? '简介' : file.replace('.md', ''),
                link: `/modules/${dir}/${file.replace('.md', '')}`
            }));
        return {
            text: dir,
            collapsed: true,
            items: files
        };
    });
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
            '/modules': modulesSections,
            '/study': studySections,
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
