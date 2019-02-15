//generage an array of random numbers ranging from min to max
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
