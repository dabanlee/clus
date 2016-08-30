//

describe('Core Test', function () {
    it('$.trim()', function () {
        expect($.trim('hello Clus.  ')).to.equal('hello Clus.');
    })
    it('$.type()', function () {
        expect($.type('')).to.equal('string');
        expect($.type({})).to.equal('object');
        expect($.type(true)).to.equal('boolean');
    })
    it('$(selector)', function () {
        expect($('body')[0]).to.equal(document.querySelectorAll('body')[0]);
        expect($('.mocha')[0]).to.equal(document.querySelectorAll('.mocha')[0]);
        expect($('#mocha')[0]).to.equal(document.querySelectorAll('#mocha')[0]);
    })
    it('$(DOMNode)', function () {
        expect($(document)[0]).to.equal(document);
        expect($(window)[0]).to.equal(window);
    })
});
