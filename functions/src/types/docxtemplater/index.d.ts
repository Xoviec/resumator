
declare module "docxtemplater" {
  export = Docxtemplater;
}
declare class Docxtemplater {
  constructor(zip?: PizZip, options?: Docxtemplater.Options);

  setData(tags: {[key: string]: any }): this;
  
  render(): this;

  getZip(): PizZip;
}

declare namespace Docxtemplater {
  interface Options {
    modules?: any[],
    delimiters?: {
      start: string,
      end: string
    }
  }
}

declare module "docxtemplater-image-module" {
  export = ImageModule;
}

declare class ImageModule {
  constructor(options?: ImageModule.Options);
}

declare namespace ImageModule {
  interface Options {
    centered?: boolean;
    getImage?: any;
    getSize?: (img: string, tagValue: string, tagName: string) => number[];
  }
}