//randomized arrays to pick keys from
var cityKeys = Object.keys(cities); // array of city names
var eventKeys = Object.keys(events);

function Card(type, key) {
  this.type = type; // epidemic or city or event or infection
  this.key = key; // <cityName> or 'epidemic' or <eventType>
};

// Player cards deck and Infection cards deck will be comprised of Card instances.


