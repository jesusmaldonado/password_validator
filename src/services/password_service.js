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
      characterTypes['letters'] += 1;
      continue
    }
    if (char.match(/[0-9]/g)) {
      characterTypes['digits'] += 1;
      continue
    }
    if (char.match(/ /g)) {
      characterTypes['whitespace'] += 1;
      continue
    }
    //if we are here we have another character
    characterTypes['other'] += 1;
  }
  const keys = Object.keys(characterTypes);
  const characterTypeCount = keys
                             .map((key) => {
                               const instanceCount = characterTypes[key];
                               if (instanceCount > 0) {
                                 return 1;
                               }
                               return 0;
                            })
                            .reduce((a, b) => a+b);
  const includedCharacterTypes = keys
                                 .filter((key) => {
                                   const instanceCount = characterTypes[key];
                                   if (instanceCount > 0) {
                                     return true;
                                   }
                                   return false;
                                 });
  const missingCharacterTypes = Object.keys(characterTypes)
                               .filter((type) => {
                                 return !includedCharacterTypes.includes(type);
                               });
  return [
    characterTypeCount,
    includedCharacterTypes,
    missingCharacterTypes,
    characterTypes
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
        strength: 'strong',
        message: `Congratulations ${password} is strong!`
      }
    case (passwordStrength >= 10 && passwordStrength <= 50):
      const modifiedPassword = modifyPassword(password);
      return {
        originalPassword: password,
        modifiedPassword,
        passwordStrength,
        strength: 'weak',
        message: `${password} is too weak! How about ${modifiedPassword}`
      }
    default:
      return {
        originalPassword: password,
        passwordStrength,
        strength: 'unacceptable',
        message: `${password} is unacceptable!`
      }
  }
};

export function modifyPassword(password) {
  const [
    characterTypeCount,
    includedCharacterTypes,
    missingCharacterTypes,
    characterTypes
  ] = countCharacterTypes(password);
  return missingCharacterTypes;
};
