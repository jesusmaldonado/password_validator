var englishWords = require("an-array-of-english-words");
export function replaceEnglishWords(password){
  return password.replace(/([a-zA-Z]+)/g, (match) => {
    if (englishWords.includes(match.toLowerCase())) {
      return 'a';
    } else {
      return match;
    }
  });
};

export function countCharacterTypes(string){
  const characterTypes = {
    'letter': 0,
    'digit': 0,
    'whitespace': 0,
    'other': 0
  };
  for (let idx in string) {
    if (string.hasOwnProperty(idx)) {
      idx = parseInt(idx, 10);
    }
    const char = string[idx];
    const charType = findType(char);
    characterTypes[charType] += 1;
  }
  const keys = Object.keys(characterTypes);
  /* eslint-disable no-unused-vars */
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
  const repeatedCharacterTypes = keys
                                .filter((key) => {
                                  const instanceCount = characterTypes[key];
                                  if (instanceCount > 1) {
                                    return true;
                                  }
                                  return false;
                                });
  return [
    characterTypeCount,
    includedCharacterTypes,
    missingCharacterTypes,
    repeatedCharacterTypes,
    characterTypes
  ];
}
export function countStrength(string) {
  const [numCharacters] = countCharacterTypes(string);
  return numCharacters * string.length;
}

export function validatePassword(password){
  const substitutedString = replaceEnglishWords(password);
  let passwordStrength = countStrength(substitutedString);
  if (passwordStrength > 50) {
    return {
      originalPassword: password,
      passwordStrength,
      strength: 'strong',
      message: `Congratulations ${password} is strong!`
    }
  } else if (passwordStrength >= 10 && passwordStrength <= 50){
    let modifiedPassword = modifyPassword(password);
    let passwordStrength = countStrength(modifiedPassword);
    while (passwordStrength <= 50) {
      modifiedPassword = modifyPassword(modifiedPassword);
      passwordStrength = countStrength(modifiedPassword);
    }
    return {
      originalPassword: password,
      modifiedPassword,
      passwordStrength,
      strength: 'weak',
      message: `${password} is too weak! How about ${modifiedPassword}`
    }
  } else {
    return {
      originalPassword: password,
      passwordStrength,
      strength: 'unacceptable',
      message: `${password} is unacceptable! Try a longer password!`
    }
  }
};

export function modifyPassword(password) {
  /* eslint-disable no-unused-vars */
  const [
    characterTypeCount,
    includedCharacterTypes,
    missingCharacterTypes,
    repeatedCharacterTypes,
    ...rest
  ] = countCharacterTypes(password);
  /* eslint-enable no-unused-vars */
  if (repeatedCharacterTypes.length && missingCharacterTypes.length) {
    const replacedString = replaceString(password, repeatedCharacterTypes, missingCharacterTypes);
    return replacedString;
  } else {
    const randomChar = Math.random().toString(36).slice(6)[0];
    return password + randomChar;
  }
};

export function replaceString(password, repeats, missing) {
  const specialSubstitution = containsSpecialSubstitution(password, repeats, missing);
  if (specialSubstitution) {
    return specialSubstitution;
  }
  for (let idx = 0; idx < password.length; idx++) {
    var char = password[idx];
    var charType = findType(char);
    if (repeats.includes(charType)) {
      var missingType = missing.shift()
      var substitutedString = substituteString(password, idx, missingType, char);
      return substitutedString;
    }
  }
}

export function findType(char) {
  if (char.match(/[a-zA-Z]/g)) {
    return 'letter';
  }
  if (char.match(/[0-9]/g)) {
    return 'digit';
  }
  if (char.match(/ /g)) {
    return 'whitespace'
  }
  return 'other';
}

export function substituteString(password, idx, missing, char) {
  const substitutionMap = {
    'letter': 'r',
    'digit': '0',
    'whitespace': ' ',
    'other': '_'
  };
  const newChar = substitutionMap[missing];
  return password.substr(0, idx) + newChar + password.substr(idx+1);
}

export function containsSpecialSubstitution(password, repeats, missing) {
  const potentialSpecialConditions = [
    {
      regex: /0/i,
      repeat: 'digit',
      missing: 'letter',
      substitution: 'o'
    },
    {
      regex: /o/i,
      repeat: 'letter',
      missing: 'digit',
      substitution: '0'

    },
    {
      regex: /1/i,
      repeat: 'digit',
      missing: 'letter',
      substitution: 'i'
    },
    {
      regex: /i/i,
      repeat: 'letter',
      missing: 'digit',
      substitution: '1'
    },
    {
      regex: /a/i,
      repeat: 'letter',
      missing: 'other',
      substitution: '@'
    },
    {
      regex: /@/i,
      repeat: 'other',
      missing: 'letter',
      substitution: 'a'
    },
    {
      regex: /s/i,
      repeat: 'letter',
      missing: 'other',
      substitution: '$'
    },
    {
      regex: /\$/i,
      repeat: 'other',
      missing: 'letter',
      substitution: 's'
    },
    {
      regex: /l/i,
      repeat: 'letter',
      missing: 'other',
      substitution: '!'
    },
    {
      regex: /!/i,
      repeat: 'other',
      missing: 'letter',
      substitution: 'l'
    }
  ];
  let newPw = false;
  potentialSpecialConditions.forEach((condition) => {
    const specialSubstitution = missing.includes(condition['missing']);
    const matchingCharacter = password.match(condition['regex']);
    if (matchingCharacter && specialSubstitution) {

      const matchingIndex = condition['regex'].lastIndex;
      const char = password[matchingIndex];
      const charType = findType(char);
      if (repeats.includes(charType)) {
        newPw = password.substr(0, matchingIndex) +
          condition['substitution'] +
          password.substr(matchingIndex + 1);
      }
    }
  });
  console.log(newPw);
  return newPw;
}
