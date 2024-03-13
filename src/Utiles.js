export function encryptText(inputText, secretCode) {
    let encryptedText = '';
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      const charCode = char.charCodeAt(0);
      const secretCharCode = secretCode.charCodeAt(i % secretCode.length); // Repeating the secret code
      const encryptedCharCode = charCode + secretCharCode;
      encryptedText += String.fromCodePoint(encryptedCharCode);
    }
    return encryptedText;
  }


  export function decryptText(encryptedText, secretCode) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) { 
      const char = encryptedText[i];
      const charCode = char.charCodeAt(0);
      const secretCharCode = secretCode.charCodeAt(i % secretCode.length); // Repeating the secret code
      const decryptedCharCode = charCode - secretCharCode;
      
      // Check if the decrypted character is outside the valid character range (e.g., less than 32)
      if (decryptedCharCode < 32) {
        return ''; // Incorrect code, return an empty string
      }
  
      decryptedText += String.fromCodePoint(decryptedCharCode);
    }
    return decryptedText;
  }


  //Time-Zone get Time and date

export const Date_and_Time=(date)=>{
  if(date){
// Get the timezone dynamically from the client's browser
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Get current date and time in the specified timezone
let currentDate = new Date(date).toLocaleString("en-US", { timeZone });
console.log(date,currentDate,"this ..");
// Extract date and time components
let [datePart, timePart] = currentDate.split(", "); // Splitting date and time
let [month, day, year] = datePart.split("/"); // Extracting month, day, year
let [time, period] = timePart.split(" "); // Extracting time and period (AM/PM)

// Output the result
return `${month}/${day}/${year} ${" "} ${time} ${period}` 
  }
// return{
//   date:`${month}/${day}/${year}`,
//   time:time, period
// }

}