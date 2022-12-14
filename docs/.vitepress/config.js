import {nestjsSidebar} from "./backend/nestjsSiderbar";
import {colorfulSidebar} from "./backend/colorfulSiderbar";
import { nginxSidebar } from "./backend/nginxSidebar";
export default {
	base: '/coderli-vitepress/',
	title: '蒸汽机里の业余小码农',
	description: 'Talk is cheap, show me your code.',
	themeConfig: {
		siteTitle: 'coder の life',
		logo: '/img/logo.png',
		nav: [
			{
				text: '首页',
				link: '/index',
			},
			{
				text: '前端小食堂',
				activeMatch: 'frontend',
				items:[
					{
						text: '基本功',
						items:[
							{text: 'Html', link:'/frontend/html/'},
							{text: 'CSS', link:'/frontend/css/'},
							{text: 'JavaScript', link:'/frontend/javascript/'},
							{text: 'TypeScript', link:'/frontend/typescript/'},
						]
					},
					{
						text: '框架',
						items:[
							{text: 'React', link:'/frontend/react/'},
							{text: 'Vue', link:'/frontend/vue/'},
						]
					},
					{
						text: '丰富资源',
						items:[
							{text: '组件库', link:'/frontend/ui/'},
						]
					}
				]
			},
			{
				text: '后端自习室',
				activeMatch: '/backend/',
				items: [
					{
						text: '框架',
						items:[
							{text: 'NestJS', link:'/backend/nestjs/'},
						]
					},
					{
						text: '服务器',
						items:[
							{text: 'Nginx', link:'/backend/nginx/'},
						]
					},
				]
			},
			{
				text: '巨人的肩膀',
				link: '/bigMan/',
			},
			{
				text: 'bug集中营',
				link: '/bug/',
			},
			{
				text: '缤纷世界',
				link: '/colorfulLife/',
			},
		],
		sidebar: {
			'/backend/nestjs/': nestjsSidebar,
			'/backend/nginx/': nginxSidebar,
			'/colorfulLife/': colorfulSidebar,
		},

		socialLinks: [
			{icon: 'github', link: 'https://github.com/lijing-2008/coderli-vitepress'},
		]

	}

}
