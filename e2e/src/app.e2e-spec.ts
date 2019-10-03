import { SamPage } from './app.po';

describe('Sam App', () => {
    let page: SamPage;

    beforeEach(() => {
        page = new SamPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome!');
    });
});
