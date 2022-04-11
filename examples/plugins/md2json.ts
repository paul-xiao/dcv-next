import { marked } from "marked";
import * as fs from "fs";

const fileRegex = /\.(md)$/;

export default function md2json() {
  return {
    name: "vite-plugin-md2json", // 必须的，将会在 warning 和 error 中显示
    async transform(src: any, path: string) {
      if (fileRegex.test(path)) {
        try {
          const code: any = await fs.readFileSync(path, "utf-8");
          const res = marked.lexer(code);
          return `export default ${JSON.stringify(res)}`;
        } catch (error) {
          return {
            error,
          };
        }
      }
    },
    async handleHotUpdate(ctx: any) {
      const { file } = ctx;
      if (fileRegex.test(file)) {
        const code: any = await fs.readFileSync(file, "utf-8");
        const res = marked.lexer(code);
        return {
          ...ctx,
          read: () => {
            return `export default ${JSON.stringify(res)}`;
          },
        };
      }
    },
  };
}
