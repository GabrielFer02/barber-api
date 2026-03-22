import IMailTemplateProvider, { IParseMailTemplateDTO } from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file }: IParseMailTemplateDTO): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
