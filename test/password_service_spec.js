import {expect} from 'chai';
import {
  validatePassword,
  replaceEnglishWords,
  countStrength,
  countCharacterTypes,
  modifyPassword,
  substituteString
} from '../src/services/password_service';

describe('Password Service', () => {
  describe('validatePassword', () => {
    //   it('returns the unacceptable password', () => {
    //     var password = 'a';
    //     var result = validatePassword(password);
    //     expect(result.strength).to.equal('unacceptable');
    //   });
      it('returns lengthened password when weak', () => {
        var password = 'x0_ ';
        var result = validatePassword(password);
        console.log("=========");
        console.log("=========");
        console.log("=========");
        console.log(result);
        console.log("=========");
        console.log("=========");
        console.log("=========");
        expect(result.strength).to.equal('weak');
      });
    //   it('returns substituted password when weak', () => {
    //     var password = 'x02)rrrrrrrrrrrr';
    //
    //     var result = validatePassword(password);
    //     expect(result.strength).to.equal('weak');
    //   });
    //   it('returns substituted, lengthened password when weak', ()=> {
    //     var password = 'x02)rrrrrr';
    //     var result = validatePassword(password);
    //     expect(result.strength).to.equal('weak');
    //   });
    //   it('returns the password unmodified when strong', () => {
    //     var password = 'x0_ r2461345a';
    //
    //     var result = validatePassword(password);
    //     expect(result.strength).to.equal('strong');
    // });
  });
  describe('replaceWords', () => {
    it('replaces an instance of an english word', () => {
      expect(replaceEnglishWords('password1')).to.equal('a1');
    });
    it('replaces passwords with lots of types', () => {
      expect(replaceEnglishWords('x0_ ')).to.equal('x0_ ');
    });
    it('replaces multiple instances of an english word', () => {
      expect(replaceEnglishWords('password1_goat_why')).to.equal('a1_a_a');
    });
  });

  describe('countStrength', () => {
    it('counts password1 correctly', () => {
      expect(countStrength('a1')).to.equal(4);
    });
    it('counts goat m4n correctly', () => {
      expect(countStrength('a m4n')).to.equal(15);

    });
    it('counts s0_0per 5n4k3 correctly', () => {
      expect(countStrength('s0_0a 5n4k3')).to.equal(44);
    });
  });

  describe('countCharacterTypes', () => {
    it('counts a1 correctly', () => {
      expect(countCharacterTypes('a1')[0]).to.equal(2);
    });
    it('counts a m4n correctly', () => {
      expect(countCharacterTypes('a m4n')[0]).to.equal(3);

    });
    it('counts s0_0a 5n4k3 correctly', () => {
      expect(countCharacterTypes('s0_0a 5n4k3')[0]).to.equal(4);
    });
  });

  describe('modifyPassword', () => {
    it('returns a lengthened password', () => {
      var password = 'x0_ ';
      var result = modifyPassword(password);
      console.log(result);
      expect(result.length).to.not.equal(password.length);
    });
    it('returns a substituted before a lengthened password', () => {
      var password = '.99';
      var result = modifyPassword(password);
      expect(result.length).to.equal(password.length);
    });
  });

  describe('substituteString', () => {
    it('substitutes a string with a different charType at an index', () => {
      expect(substituteString('.99', 1, 'letter')).to.equal('.r9');
    });
  });
});
