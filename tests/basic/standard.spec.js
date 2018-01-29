import chai from 'chai';

chai.should();

describe('Test suit', function () {
  it('should be ok', function () {
    const actual = 0;

    actual.should.be.eql(0);
  });
});