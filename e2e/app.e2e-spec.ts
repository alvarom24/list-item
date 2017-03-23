import { ITEMLISTPage } from './app.po';

describe('item-list App', () => {
  let page: ITEMLISTPage;

  beforeEach(() => {
    page = new ITEMLISTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
