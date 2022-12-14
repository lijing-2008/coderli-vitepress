import {nestjsSidebar} from "./backend/nestjsSiderbar";
import {colorfulSidebar} from "./colorfulLife/colorfulSiderbar";
import { nginxSidebar } from "./backend/nginxSidebar";
import {bigManSidebar} from "./bigMan/bigManSiderbar";
import {bugSidebar} from "./bug/bugSiderbar";
import {frontendNav} from "./frontend";
import {backendNav} from "./backend";
import {gitSidebar} from "./backend/gitSidebar";
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
			frontendNav,
			backendNav,
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
			// 前端
			// 后端
			'/backend/nestjs/': nestjsSidebar,
			'/backend/nginx/': nginxSidebar,
			'/backend/git/': gitSidebar,
			// 巨人的肩膀
			'/bigMan/': bigManSidebar,
			// bug集中营
			'/bug/': bugSidebar,
			// 缤纷世界
			'/colorfulLife/': colorfulSidebar,
		},

		socialLinks: [
			{icon: 'github', link: 'https://github.com/lijing-2008/coderli-vitepress'},
		]

	}

}
