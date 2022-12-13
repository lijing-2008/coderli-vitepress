import {nestjsSidebar} from "./backend/nestjsSiderbar";

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
				link: '/index/',
				activeMatch: '/index/'
			},
			{
				text: '前端小食堂',
				items:[
					{
						text: '基本功',
						items:[
							{text: 'Html', link:'/html/',activeMatch: '/html/'},
							{text: 'CSS', link:'/css/',activeMatch: '/css/'},
							{text: 'JavaScript', link:'/javascript/',activeMatch: '/javascript/'},
							{text: 'TypeScript', link:'/typescript/',activeMatch: '/typescript/'},
						]
					},
					{
						text: '框架',
						items:[
							{text: 'React', link:'/react/',activeMatch: '/react/'},
							{text: 'Vue', link:'/vue/',activeMatch: '/vue/'},
						]
					},
					{
						text: '丰富资源',
						items:[
							{text: '组件库', link:'/ui/',activeMatch: '/ui/'},
						]
					}
				]
			},
			{
				text: '后端自习室',
				activeMatch: '/nestjs/',
				items: [
					{text: 'NestJS', link:'/nestjs/'}
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
		],
		sidebar: {
			'/nestjs/': nestjsSidebar,
		},

		socialLinks: [
			{icon: 'github', link: 'https://github.com/lijing-2008'},
		]

	}

}
