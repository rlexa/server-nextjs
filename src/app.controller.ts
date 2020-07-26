import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const fTag = (tag: string, ...attr: string[]) => (...nest: string[]) =>
  `<${tag}${attr ? ` ${attr.join(' ')}` : ''}>${nest.join('')}</${tag}>`;

const tBody = fTag('body');
const tH1 = fTag('h1');
const tHtml = fTag('html');
const tLi = fTag('li');
const tUl = fTag('ul');

const toLinkList = (...routes: string[]) =>
  tUl(
    ...routes.map((ii) => fTag('a', `href="${ii}"`)(ii)).map((ii) => tLi(ii)),
  );

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBootstrap() {
    return tHtml(tBody(tH1('Server'), toLinkList('hello')));
  }

  @Get('hello')
  getHello() {
    return { data: this.appService.getHello() };
  }
}
