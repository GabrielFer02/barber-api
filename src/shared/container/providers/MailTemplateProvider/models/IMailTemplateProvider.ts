interface IParseMailTemplateDTO {
  file: string;
  variables: Record<string, string | number>;
}

export { IParseMailTemplateDTO };

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
