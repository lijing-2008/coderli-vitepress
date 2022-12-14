import { walk } from "../scripts/utils";
const nginxItems = walk('./docs/backend/nginx')
export const nginxSidebar = [
	{
		text: 'Nginx基础',
		collapsible: true,
		collapsed: false,
		items: nginxItems	
    },
]
