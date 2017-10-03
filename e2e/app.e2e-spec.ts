import { TeamscrimPage } from './app.po';

describe('teamscrim App', () => {
  let page: TeamscrimPage;

  beforeEach(() => {
    page = new TeamscrimPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
