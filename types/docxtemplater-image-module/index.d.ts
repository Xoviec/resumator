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
