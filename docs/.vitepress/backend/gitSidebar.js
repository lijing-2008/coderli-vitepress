import { walk } from "../scripts/utils";
const baseDir = './docs/backend/git/'
export const gitSidebar = [
	walk(baseDir,'Git基本配置'),
	walk(baseDir,'Git常用命令'),
	walk(baseDir,'Git远程仓库'),
]
