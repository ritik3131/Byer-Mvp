const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  let R = 6378.16; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const calculatePriceForDelivery = (lat1, lon1, lat2, lon2, quantity) => {
  const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  let price = 0;
  price = 10 + distance > 1 ? (distance - 1) * 2 : 0;
  return price;
};
