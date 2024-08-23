import moment from "moment";
// export function encryptText(inputText, secretCode) {
//     let encryptedText = '';
//     for (let i = 0; i < inputText.length; i++) {
//       const char = inputText[i];
//       const charCode = char.charCodeAt(0);
//       const secretCharCode = secretCode.charCodeAt(i % secretCode.length); // Repeating the secret code
//       const encryptedCharCode = charCode + secretCharCode;
//       encryptedText += String.fromCodePoint(encryptedCharCode);
//     }
//     return encryptedText;
//   }
export function encryptText(inputText, secretCode) {
  if(inputText){
  let encryptedText = '';
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText[i];
    const charCode = char.charCodeAt(0);
    const secretCharCode = secretCode.charCodeAt(i % secretCode.length);
    const encryptedCharCode = (charCode + secretCharCode) % 65536; // Ensure valid range
    encryptedText += String.fromCharCode(encryptedCharCode);
  }
  return encryptedText;
  }
}

  export function decryptText(encryptedText, secretCode) {
    if(encryptedText){
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedText[i];
      const charCode = char.charCodeAt(0);
      const secretCharCode = secretCode.charCodeAt(i % secretCode.length);
      const decryptedCharCode = (charCode - secretCharCode + 65536) % 65536; // Ensure non-negative code
  
      // For readability, replace non-printable characters with space
      if (decryptedCharCode < 32) {
        decryptedText += ' ';
      } else {
        decryptedText += String.fromCharCode(decryptedCharCode);
      }
    }
    return decryptedText;
  }
  }
  
  // export function decryptText(encryptedText, secretCode) {
  //   if(encryptedText){
  //   let decryptedText = '';
  //   for (let i = 0; i < encryptedText.length; i++) { 
  //     const char = encryptedText[i];
  //     const charCode = char.charCodeAt(0);
  //     const secretCharCode = secretCode.charCodeAt(i % secretCode.length); // Repeating the secret code
  //     const decryptedCharCode = charCode - secretCharCode;
      
  //     // Check if the decrypted character is outside the valid character range (e.g., less than 32)
  //     if (decryptedCharCode < 32) {
  //       return ''; // Incorrect code, return an empty string
  //     }
  
  //     decryptedText += String.fromCodePoint(decryptedCharCode);
  //   }
  //   return decryptedText;
  // }
  // }


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
export const UserDate=(date)=>{
  if(date){
// Get the timezone dynamically from the client's browser
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Get current date and time in the specified timezone
let currentDate = new Date(date).toLocaleString("en-US", { timeZone });
// Extract date and time components
let [datePart, timePart] = currentDate.split(", "); // Splitting date and time
let [month, day, year] = datePart.split("/"); // Extracting month, day, year
let [time, period] = timePart.split(" "); // Extracting time and period (AM/PM)

// Output the result
return `${month}/${day}/${year}` 
  }
// return{
//   date:`${month}/${day}/${year}`,
//   time:time, period
// }

}
export const UserTime = (date) => {
  if (date) {
    // Get the timezone dynamically from the client's browser
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get current date and time in the specified timezone
    let currentDate = new Date(date).toLocaleString("en-US", { timeZone });

    let [, timePart] = currentDate.split(", "); // Splitting date and time
    let [time, period] = timePart.split(" "); // Extracting time and period (AM/PM)
    let [hours, minutes] = time.split(":"); // Splitting hours and minutes

    // Output the result
    console.log(`${hours}:${minutes} ${period}`, "timetimetime");
    return `${hours}:${minutes} ${period}`;
  }

  return '';
}



export function removeDuplicates(array, property) {
  return array.filter((obj, index, self) =>
      index === self.findIndex((t) => (
          t[property] === obj[property]
      ))
  );
}


//Link formate check
export function isValidLink(link) {
  const pattern = /^(https?:\/\/)?(www\.)?[a-z0-9-]+\.(com|org|net|edu|gov|mil|int|info|biz|co|io|us|uk|ca|de|fr|au|jp|cn|in|br|kr|mx|es|it|nl|se|no|fi|dk|pl|ru|ch|be|gr|pt|cz|hu|tr|ro|sk|si|hr|lt|lv|ee|at|ie|is|my|id|th|sg|nz|sa|ae|za|ar|cl|pe|ve|uy|bg|rs|ba|me|md|mk|am|ge|az|tm|kz|uz|kg|by|ua|lv|lt|ee|mt|cy|lu|li|sm|ad|mc|va|gi|fo|je|gg|im|yt|pm|tf|wf|re|pf|nc|ki|mh|fm|pw|as|mp|gu|vi|um|ck|nz|nu|tk|to|tv|vu|fj|ws|sb|pg|nr|cc|cx|hm|nf|tk|tv|vu|ac|sh|io|ai|ag|vc|kn|ms|sc|mu|mw|ke|tz|ug|zm|zw|na|bw|ls|sz|gm|sl|lr|gh|ng|bj|tg|cv|ml|ne|sn|mr|gm|gw|gn|bi|rw|dj|er|et|so|ke|tz|ug|zm|zw|na|bw|ls|sz|mg|re|yt|mu|io|ax|bl|bq|cw|gf|gp|mq|mf|pm|sx|bv|hm|aq|tf|yt|cc|eu|cat|arpa|asia|aero|coop|museum|name|pro|tel|int|mobi|jobs|travel|xxx|xyz|club|guru|agency|email|solutions|today|technology|directory|company|center|systems|photography|graphics|pictures|photos|media|cab|limo|tattoo|guitars|tips|bike|clothing|estate|ventures|holdings|partners|recipes|singles|properties|shoes|london|kyoto|berlin|wien|nyc|quebec|melbourne|rio|paris|tokyo|jobs|yokohama|nagoya|okinawa|osaka|sapporo|fukuoka|kitakyushu|hamamatsu|saitama|shizuoka|sendai|chiba|kyoto|osaka|kobe|hiroshima|kitakyushu|fukuoka|kawasaki|sagamihara|yokohama|nagoya|sendai|sapporo|saitama|chiba|tokyo|shizuoka|hamamatsu|niigata|kawasaki|sagamihara|yokohama|nagoya|kyoto|osaka|kobe|hiroshima|kitakyushu|fukuoka|kawasaki|sagamihara|yokohama|nagoya|sendai|sapporo|saitama|chiba|tokyo|shizuoka|hamamatsu|niigata|toyama|kanazawa|nagano|gifu|fukuoka|oita|kumamoto|miyazaki|kagoshima|nagasaki|okinawa|aomori|morioka|sendai|akita|yamagata|fukushima|niigata|nagano|gifu|shizuoka|toyama|kanazawa|fukui|yamanashi|nagoya|kyoto|osaka|kobe|hiroshima|kitakyushu|fukuoka|nagasaki|kumamoto|oita|miyazaki|kagoshima|okinawa|saitama|chiba|tokyo|kanagawa|niigata|toyama|ishikawa|fukui|yamanashi|nagano|gifu|shizu)$/i;
  return pattern.test(link);
}

//Email formate check
export const validateEmail = (email) => {
  let valid= String(email)
     .toLowerCase()
     .match(
       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     );
     let valid_data= Array.isArray(valid)?true:false
     return valid_data
 };

 export const TimeMoment=(date)=>{

  const currentTime = moment();
        const uploadTime = moment(date);
        const duration = moment.duration(currentTime.diff(uploadTime))
        let formattedTime;
        if (duration.asSeconds() < 60) {
          formattedTime = Math.ceil(duration.asSeconds()) + ' seconds ago';
        } else if (duration.asMinutes() < 60) {
          formattedTime = Math.ceil(duration.asMinutes()) + ' minutes ago';
        } else if (duration.asHours() < 24) {
          formattedTime = Math.ceil(duration.asHours()) + ' hours ago';
        } else if (duration.asDays() < 30) {
          formattedTime = Math.ceil(duration.asDays()) + ' days ago';
        } else if (duration.asMonths() < 12) {        
          formattedTime = Math.ceil(duration.asMonths()) + ' months ago';
        } else {
          formattedTime = Math.ceil(duration.asYears()) + ' years ago';
        }
        return formattedTime
 }

 export const DateShowMonth=(dateString)=>{

  const date = new Date(dateString);

const day = date.getUTCDate();
const month = date.toLocaleString('default', { month: 'long' });
const year = date.getUTCFullYear();

const formattedDate = `${day<=9?`0${day}`:day}-${month}-${year}`;
return formattedDate
 }



 export function formatNumber(num) {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}