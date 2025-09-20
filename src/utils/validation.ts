import { isAddress } from 'viem';

export const isValidAddress = (address: string): boolean => {
    return isAddress(address);
};

export const isPositiveNumber = (value: string): boolean => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
};
