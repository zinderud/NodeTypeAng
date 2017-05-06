import { FrontAngPage } from './app.po';

describe('front-ang App', () => {
  let page: FrontAngPage;

  beforeEach(() => {
    page = new FrontAngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
