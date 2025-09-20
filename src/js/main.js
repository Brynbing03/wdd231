import { getParkData } from './parkService.mjs';

const parkData = getParkData();

// disclaimer link
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

// page title
document.title = parkData.fullName;

// hero background image (first image in data)
const parkHeader = document.querySelector("#park-header");
if (parkData.images && parkData.images.length > 0) {
  parkHeader.style.backgroundImage = `url(${parkData.images[0].url})`;
}

// hero info box (name, designation, states)
const parkInfo = document.querySelector(".park-info");

function parkInfoTemplate(info) {
  return `
    <h1>${info.name}</h1>
    <p>${info.designation}<br />${info.states}</p>
  `;
}

parkInfo.innerHTML = parkInfoTemplate(parkData);

// park icons row (info, alerts, maps, calendar, fees)
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
        <use xlink:href="images/sprite.symbol.svg#map"></use>
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
      <svg class="icon">
        <use xlink:href="images/sprite.symbol.svg#fees"></use>
      </svg>
      <span>Fees</span>
    </a>
  `;
}

parkIconsRow.innerHTML = parkIconsTemplate(parkData);
