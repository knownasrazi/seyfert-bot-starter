declare const TEMPLATE_DIR: string;
declare function scaffold(targetDir: string): Promise<string>;

export { TEMPLATE_DIR, scaffold };
