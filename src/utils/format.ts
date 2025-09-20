export const shortenAddress = (address: string, chars = 4) => {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
