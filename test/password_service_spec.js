import {expect} from 'chai';
import {
  validatePassword,
  replaceEnglishWords,
  countStrength,
  countCharacterTypes,
  modifyPassword
} from '../src/services/password_service';

describe('Password Service', () => {
  describe('validatePassword', () => {
    // it('', () => {
    //   expect(validatePassword('lol')).to.equal('lol');
    // });
  });
  describe('replaceWords', () => {
    it('replaces an instance of an english word', () => {
      expect(replaceEnglishWords('password1')).to.equal('a1');
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
    it('modifies characters before inserting new ones', () => {
      expect(modifyPassword('goat m4n')).to.deep.equal(['other']);
    });
  });
});
