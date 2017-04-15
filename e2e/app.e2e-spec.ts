import { ClspFrontendPage } from './app.po';

describe('clsp-frontend App', () => {
  let page: ClspFrontendPage;

  beforeEach(() => {
    page = new ClspFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
