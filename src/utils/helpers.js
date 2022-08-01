export const isLink = (str) => {
  const pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
  return !!pattern.test(str);
};

export const generateUniqtId = (name) => {
  let guestName = name || "Anonymous";
  guestName = guestName.split(" ");
  const prefixCode = guestName[0].substring(0, 1).toUpperCase() + (guestName[1] ? guestName[1].substring(0, 1).toUpperCase() : "");
  const randomNumber = Math.floor(Math.random() * 10);
  const dateNow = new Date();
  const h = dateNow.getHours();
  const i = dateNow.getMinutes();
  const s = dateNow.getSeconds();
  const y = dateNow.getFullYear();
  const m = (dateNow.getMonth() + 1);
  const d = dateNow.getDate();
  const guestId = prefixCode + s + d + h + m + i + y + randomNumber;

  return guestId;
};

export const toBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0) { byteString = atob(dataURI.split(",")[1]); } else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString, name: generatorId(30) });
};

export const generatorId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const clearCookie = (cname, cvalue, exdays) => {
  document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
};

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const checkCookie = (cname) => {
  let username = getCookie(cname);
  if (username !== "") {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username !== "" && username != null) {
      setCookie("username", username, 365);
    }
  }
};

export const countDate = (dateFuture) => {
  let dateNow = new Date();
  dateNow = parseInt(dateNow.getTime());

  const compare = parseInt(dateFuture) - dateNow;
  let delta = Math.abs(compare) / 1000;

  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = Math.floor(delta % 60); // in theory the modulus is not required

  const daysText = days > 0 ? `${days} Days` : "";
  const hoursText = hours > 0 ? `${hours} Hours` : "";
  const minutesText = minutes > 0 ? `${minutes} Minutes` : "";
  const secondsText = seconds > 0 ? `${seconds} Seconds` : "";
  const result = (compare > 0) ? `${daysText} ${hoursText} ${minutesText} ${secondsText}` : "";

  return result;
};

export const storeData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const userData = (key) => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const userDataTranslated = JSON.parse(userData);
    return userDataTranslated[key] ? userDataTranslated[key] : null;
  } else {
    return null;
  }
};

export const getTokenLogo = (id) => {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
};

export const currencyId = (number) => {
  return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 2 }).format(number);
};

export const shortenAddress = (address, size = 6) => {
  const walletAddress = address ? String(address) : "";
  const firstAddress = walletAddress.substring(0, size);
  const lastAddress = walletAddress.slice(-size);
  return `${firstAddress}...${lastAddress}`;
};

export const runCallback = (cb) => {
  return cb();
};

export const skeletonPlaceholder = (element, amount) => {
  const temp = [];
  for (let i = 0; i < amount; i++) {
    temp.push(element);
  }
  return temp;
};

export const storeUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserData = (detail) => {
  let results;
  let userData = localStorage.getItem("userData");
  userData = (userData && userData !== "undefined") ? JSON.parse(userData) : null;
  if (detail) {
    results = userData ? userData[detail] : null;
  } else {
    results = userData || null;
  }
  return results;
};

export const storeToken = (token) => {
  localStorage.setItem("userToken", token);
};

export const clearUserDataInLocalstorage = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("walletAddress");
};

export const getToken = () => {
  const token = localStorage.getItem("userToken");
  return token;
};

export const storeGameData = (data, time) => {
  const gameData = {
    data: data,
    lastFetch: time,
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
};

export const getGameData = (data, time) => {
  const gameData = localStorage.getItem("gameData");
  return gameData ? JSON.parse(gameData) : { data: null, lastFetch: null };
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let results;
  if ((seconds / 31536000) > 1) {
    results = Math.floor(seconds / 31536000) + " Years";
  } else if ((seconds / 2592000) > 1) {
    results = Math.floor(seconds / 2592000) + " Months";
  } else if ((seconds / 86400) > 1) {
    results = Math.floor(seconds / 86400) + " Days";
  } else if ((seconds / 3600) > 1) {
    results = Math.floor(seconds / 3600) + " Hours";
  } else if ((seconds / 60) > 1) {
    results = Math.floor(seconds / 60) + " Minutes";
  } else {
    results = Math.floor(seconds) + " Seconds";
  }

  return `${results} ago`;
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const convertMsToTime = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};

export const currency = (price) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(price);
};
