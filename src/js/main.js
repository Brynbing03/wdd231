import { getParkData } from './parkService.mjs';

const parkData = getParkData();

// --------- SET HEADER INFO ---------
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

document.title = parkData.fullName;

const parkHeader = document.querySelector("#park-header");
if (parkData.images && parkData.images.length > 0) {
  parkHeader.style.backgroundImage = `url(${parkData.images[0].url})`;
}

const parkInfo = document.querySelector(".park-info");
function parkInfoTemplate(info) {
  return `
    <h1>${info.name}</h1>
    <p>${info.designation}<br />${info.states}</p>
  `;
}
parkInfo.innerHTML = parkInfoTemplate(parkData);

// --------- SET ICONS ROW ---------
const parkIconsRow = document.querySelector(".park-header__icons");
function parkIconsTemplate(park) {
  return `
    <a href="${park.url}" target="_blank" rel="noopener">
      <svg class="icon">
        <use xlink:href="images/sprite.symbol.svg#info"></use>
      </svg>
      <span>Info</span>
    </a>
    <a href="${park.alertsUrl || '#'}" target="_blank" rel="noopener">
      <svg class="icon">
        <use xlink:href="images/sprite.symbol.svg#alert"></use>
      </svg>
      <span>Alerts</span>
    </a>
    <a href="${park.mapsUrl || '#'}" target="_blank" rel="noopener">
      <svg class="icon">
        <use xlink:href="images/sprite.symbol.svg#location"></use>
      </svg>
      <span>Maps</span>
    </a>
    <a href="${park.calendarUrl || '#'}" target="_blank" rel="noopener">
      <svg class="icon">
        <use xlink:href="images/sprite.symbol.svg#calendar"></use>
      </svg>
      <span>Calendar</span>
    </a>
    <a href="${park.feesUrl || '#'}" target="_blank" rel="noopener">
      <svg class="icon">         <use xlink:href="images/sprite.symbol.svg#fee-22"></use>
       </svg>
      <span>Fees</span>
    </a>
  `;
}
parkIconsRow.innerHTML = parkIconsTemplate(parkData);

// --------- INTRO SECTION ---------
function setParkIntro(data) {
  const intro = document.querySelector(".intro");
  intro.innerHTML = `
    <h2>${data.fullName}</h2>
    <p>${data.description}</p>
  `;
}

// --------- INFO CARDS SECTION ---------
function mediaCardTemplate(info) {
  return `
    <article class="media-card">
      <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}">
        <h3>${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </article>
  `;
}

function setParkInfo(data) {
  const infoSection = document.querySelector(".info");

  const parkInfoLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: data.images[2]?.url || "",
      description: "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: data.images[3]?.url || "",
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: data.images[9]?.url || "",
      description: "Learn about the visitor centers in the park."
    }
  ];

  infoSection.innerHTML = parkInfoLinks.map(mediaCardTemplate).join("");
}

// --------- FOOTER SECTION ---------
function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

function getVoicePhone(phoneNumbers) {
  const voice = phoneNumbers.find((phone) => phone.type === "Voice");
  return voice ? voice.phoneNumber : "N/A";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

function setParkFooter(data) {
  const footer = document.querySelector("#park-footer");
  footer.innerHTML = footerTemplate(data);
}

// --------- INIT FUNCTION ---------
function init() {
  setParkIntro(parkData);
  setParkInfo(parkData);
  setParkFooter(parkData);
}

init();


// import { getParkData } from './parkService.mjs';

// const parkData = getParkData();

// // disclaimer link
// const disclaimer = document.querySelector(".disclaimer > a");
// disclaimer.href = parkData.url;
// disclaimer.innerHTML = parkData.fullName;

// // page title
// document.title = parkData.fullName;

// // hero background image (first image in data)
// const parkHeader = document.querySelector("#park-header");
// if (parkData.images && parkData.images.length > 0) {
//   parkHeader.style.backgroundImage = `url(${parkData.images[0].url})`;
// }

// // hero info box (name, designation, states)
// const parkInfo = document.querySelector(".park-info");

// function parkInfoTemplate(info) {
//   return `
//     <h1>${info.name}</h1>
//     <p>${info.designation}<br />${info.states}</p>
//   `;
// }

// parkInfo.innerHTML = parkInfoTemplate(parkData);

// // park icons row (info, alerts, maps, calendar, fees)
// const parkIconsRow = document.querySelector(".park-header__icons");

// function parkIconsTemplate(park) {
//   return `
//     <a href="${park.url}" target="_blank" rel="noopener">
//       <svg class="icon">
//         <use xlink:href="images/sprite.symbol.svg#info"></use>
//       </svg>
//       <span>Info</span>
//     </a>
//     <a href="${park.alertsUrl || '#'}" target="_blank" rel="noopener">
//       <svg class="icon">
//         <use xlink:href="images/sprite.symbol.svg#alert"></use>
//       </svg>
//       <span>Alerts</span>
//     </a>
//     <a href="${park.mapsUrl || '#'}" target="_blank" rel="noopener">
//       <svg class="icon">
//         <use xlink:href="images/sprite.symbol.svg#location"></use>
//       </svg>
//       <span>Maps</span>
//     </a>
//     <a href="${park.calendarUrl || '#'}" target="_blank" rel="noopener">
//       <svg class="icon">
//         <use xlink:href="images/sprite.symbol.svg#calendar"></use>
//       </svg>
//       <span>Calendar</span>
//     </a>
//     <a href="${park.feesUrl || '#'}" target="_blank" rel="noopener">
//       <svg class="icon">
//         <use xlink:href="images/sprite.symbol.svg#fee-22"></use>
//       </svg>
//       <span>Fees</span>
//     </a>
//   `;
// }

// parkIconsRow.innerHTML = parkIconsTemplate(parkData);
