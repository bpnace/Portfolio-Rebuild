const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

function pickRandomCharacter(source: string) {
  const randomIndex = Math.floor(Math.random() * source.length);
  return source[randomIndex] ?? source[0] ?? "";
}

export function getScrambleCharacter(character: string) {
  if (/\d/u.test(character)) {
    return pickRandomCharacter(DIGITS);
  }

  if (/\p{L}/u.test(character)) {
    return pickRandomCharacter(
      character === character.toUpperCase()
        ? UPPERCASE_LETTERS
        : LOWERCASE_LETTERS,
    );
  }

  return character;
}

export function getFieldVisual(field: HTMLElement) {
  return field.querySelector<HTMLElement>("[data-scramble-visual='true']");
}

export function getInitialScrambleText(characters: string[]) {
  return characters.map((character) => getScrambleCharacter(character)).join("");
}

export function getScrambleFrameText(
  characters: string[],
  resolvedCharacters: number,
) {
  return characters
    .map((character, index) =>
      index < resolvedCharacters ? character : getScrambleCharacter(character),
    )
    .join("");
}
