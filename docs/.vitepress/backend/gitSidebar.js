import { walk } from "../scripts/utils";
const baseDir = './docs/backend/git/'
export const gitSidebar = [
	walk(baseDir,'git基本配置'),
	walk(baseDir,'git常用命令'),
	walk(baseDir,'git远程仓库'),
]
