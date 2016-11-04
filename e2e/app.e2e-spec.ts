import { LbShopPage } from './app.po';

describe('lb-shop App', function() {
  let page: LbShopPage;

  beforeEach(() => {
    page = new LbShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
