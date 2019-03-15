import { string } from "postcss-selector-parser";

//generate an array of random numbers ranging from min to max
//the size of the array is size. all numbers don't repeat.
function generateNumsArray(min, max, size) {
  if (max <= min || size <= 0)
    throw new Error("params error in generateNumsArray");
  let arr = [];
  while (arr.length < size) {
    let val = min + Math.floor((max - min + 1) * Math.random());
    if (!arr.includes(val)) arr.push(val);
  }
  return arr;
}
//generate an array of random numbers in an efficient way
//example: if size==5 then result might be [1,0,4,3,2]
function generateNumsArray2(size) {
  const result = [],
    arr = Array.from({ length: size }, (v, i) => i);
  for (let i = arr.length; i > 0; i--) {
    let n = arr.splice(Math.floor(i * Math.random()), 1);
    result.push(n[0]);
  }
  return result;
}
//generate a random lowercase letter
function generateChar() {
  return String.fromCharCode(97 + Math.floor(26 * Math.random()));
}

//generate an array of random lowercase letters
function generateCharArray(size) {
  return Array.from({ length: size }, _ => generateChar());
}

//generate an array of random lowercase containing a given word,
//the array should have a minimum length even if the given word is shorter
export function generateCharArrayWith(word = "unknown", minSize = 2) {
  const index = generateNumsArray2(word.length);
  let result = index.map(v => word.charAt(v));
  if (result.length < minSize) {
    result = result.concat(generateCharArray(minSize - result.length));
  }
  return result;
}

//generate an array of random lowercase chars that don't repeat.
//one char is specified which always exists in the array
export function generateRandomCharArray(char, size) {
  let lchar = char.toLowerCase().charAt(0);
  let lv = lchar.charCodeAt(0);
  let lmax = 97 + 25; //charcode of "z"
  if (lchar < "a" || lchar > "z" || size <= 0)
    throw new Error("params error in generateRandomCharArray");
  let arr1 = [lchar];
  let arr2 = generateNumsArray(1, 25, size - 1).map(v =>
    String.fromCharCode(v + lv > lmax ? v + lv - 26 : v + lv)
  );
  return arr1.concat(arr2).sort();
}
