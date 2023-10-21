import CryptoJS from "crypto-js";
function generateRandomNumber() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}
export default function hash(str){
  // const uniqueIdentifier = generateRandomNumber();
    var hash = 0,
    i, chr;
    if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}