import {walk} from "../scripts/utils";

const baseDir = './docs/backend/nestjs/'
export const nestjsSidebar = [
	walk(baseDir,'NestJS基础'),
	walk(baseDir,'NestJS进阶'),
	walk(baseDir,'安全认证'),
]
