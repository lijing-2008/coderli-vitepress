import { walk } from "../scripts/utils";
const baseDir = './docs/backend/gitLearn/'
export const gitSidebar = [
	walk(baseDir,'基本配置'),
	walk(baseDir,'常用命令'),
	walk(baseDir,'远程仓库'),
]
