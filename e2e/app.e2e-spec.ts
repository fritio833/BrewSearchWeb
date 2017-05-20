import { BrewSearchWebPage } from './app.po';

describe('brew-search-web App', function() {
  let page: BrewSearchWebPage;

  beforeEach(() => {
    page = new BrewSearchWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
