var canadianDollar = 0.91;

function roundTwoDecimals(ammount) {
  return Math.round(ammount * 100) / 100;
}
exports.canadianToUS = function(canadian) {
  return roundTwoDecimals(canadian * canadianDollar);
};
exports.USToCanadian = function(us) {
  return roundTwoDecimals(us / canadianDollar);
};