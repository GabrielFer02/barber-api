import { IParseMailTemplateDTO } from '../../MailTemplateProvider/models/IMailTemplateProvider';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export { ISendMailDTO };

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
