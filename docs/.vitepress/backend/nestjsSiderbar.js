export const nestjsSidebar = [
	{
		text:'NestJS基础',
		collapsible: true,
		collapsed: false,
		items:[
			{ text: '核心概念', link: '/nestjs/overview/concepts',activeMatch: '/nestjs/'},
			{ text: 'controllers', link: '/nestjs/overview/controllers' },
		]
	},
	{
		text:'NestJS进阶',
		collapsible: true,
		collapsed: false,
		items:[
			{ text: '生命周期', link: '/nestjs/fundamentals/lifetime' },
			{ text: '依赖注入', link: '/nestjs/fundamentals/dependencyInjection' },
		]
	}
]
