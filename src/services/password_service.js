var englishWords = require("an-array-of-english-words");
export function replaceEnglishWords(password){
  return password.replace(/([a-zA-Z]+)/g, (match) => {
    if (englishWords.includes(match.toLowerCase())) {
      return 'a';
    }
  });
};

export function countCharacterTypes(string){
  const characterTypes = {
    'letters': 0,
    'digits': 0,
    'whitespace': 0,
    'other': 0
  };
  for (let idx in string) {
    const char = string[idx];
    if (char.match(/[a-zA-Z]/g)) {
      characterTypes['letters'] = 1;
      continue
    }
    if (char.match(/[0-9]/g)) {
      characterTypes['digits'] = 1;
      continue
    }
    if (char.match(/ /g)) {
      characterTypes['whitespace'] = 1;
      continue
    }
    //if we are here we have another character
    characterTypes['other'] = 1;
  }
  const keys = Object.keys(characterTypes);
  const values = keys.map(key => characterTypes[key]);
  return [
    values.reduce((a, b) => a + b),
    keys
  ];
}
export function countStrength(string) {
  const [numCharacters] = countCharacterTypes(string);
  return numCharacters * string.length;
}

export function validatePassword(password){
  const substitutedString = replaceEnglishWords(password);
  const passwordStrength = countStrength(substitutedString);
  switch (passwordStrength) {
    case (passwordStrength > 50):
      return {
        originalPassword: password,
        passwordStrength,
        message: `Congratulations ${password} is strong!`
      }
    case (passwordStrength >= 10 && passwordStrength <= 50):
      const modifiedPassword = modifyPassword(password);
      return {

      }
    default:
      return {
        originalPassword: password,
        passwordStrength,
        message: `${password} is too weak!`
      }
  }
};
