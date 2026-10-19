import { CurrencyCode, CurrencyRate } from '../types';

export const PAKISTAN_CITIES = [
  { city: 'Karachi', province: 'Sindh', deliveryDays: '2-3 Days' },
  { city: 'Lahore', province: 'Punjab', deliveryDays: '1-2 Days (Express Hub)' },
  { city: 'Islamabad', province: 'Islamabad Capital Territory', deliveryDays: '2 Days' },
  { city: 'Rawalpindi', province: 'Punjab', deliveryDays: '2 Days' },
  { city: 'Faisalabad', province: 'Punjab', deliveryDays: '2-3 Days' },
  { city: 'Multan', province: 'Punjab', deliveryDays: '2-3 Days' },
  { city: 'Peshawar', province: 'Khyber Pakhtunkhwa', deliveryDays: '3 Days' },
  { city: 'Quetta', province: 'Balochistan', deliveryDays: '3-4 Days' },
  { city: 'Sialkot', province: 'Punjab', deliveryDays: '2-3 Days' },
  { city: 'Gujranwala', province: 'Punjab', deliveryDays: '2 Days' },
  { city: 'Hyderabad', province: 'Sindh', deliveryDays: '2-3 Days' },
  { city: 'Abbottabad', province: 'Khyber Pakhtunkhwa', deliveryDays: '3 Days' },
  { city: 'Bahawalpur', province: 'Punjab', deliveryDays: '3 Days' },
  { city: 'Sargodha', province: 'Punjab', deliveryDays: '2-3 Days' },
  { city: 'Sukkur', province: 'Sindh', deliveryDays: '3 Days' },
  { city: 'Mirpur (AJK)', province: 'Azad Jammu & Kashmir', deliveryDays: '3-4 Days' },
  { city: 'Gilgit', province: 'Gilgit-Baltistan', deliveryDays: '4-5 Days' },
];

export const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan',
];

export const CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  PKR: {
    code: 'PKR',
    symbol: 'Rs.',
    rate: 1,
    format: (amount) => `Rs. ${Math.round(amount).toLocaleString('en-PK')}`,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1 / 278.5,
    format: (amount) => `$${(amount / 278.5).toFixed(2)}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 1 / 355.0,
    format: (amount) => `£${(amount / 355.0).toFixed(2)}`,
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    rate: 1 / 75.8,
    format: (amount) => `${(amount / 75.8).toFixed(1)} AED`,
  },
};

export const STANDARD_SIZE_CHART = [
  { size: 'XS', bust: '34"', waist: '28"', hip: '38"', length: '40"', shoulder: '14"', armhole: '8.5"' },
  { size: 'S', bust: '36"', waist: '30"', hip: '40"', length: '41"', shoulder: '14.5"', armhole: '9"' },
  { size: 'M', bust: '39"', waist: '33"', hip: '43"', length: '42"', shoulder: '15"', armhole: '9.5"' },
  { size: 'L', bust: '42"', waist: '36"', hip: '46"', length: '43"', shoulder: '15.5"', armhole: '10"' },
  { size: 'XL', bust: '45"', waist: '40"', hip: '49"', length: '43"', shoulder: '16.5"', armhole: '10.5"' },
];

export const FREE_SHIPPING_THRESHOLD_PKR = 4999;
export const STANDARD_SHIPPING_FEE_PKR = 250;

export const DISCOUNT_CODES: Record<string, { percent: number; minOrder: number; description: string }> = {
  EID2026: { percent: 15, minOrder: 5000, description: '15% Off Eid Festive Edit (Min. Rs. 5,000)' },
  KHUSHAMDEED: { percent: 10, minOrder: 3000, description: '10% Welcome Discount for New Shoppers' },
  ZMVIP: { percent: 20, minOrder: 10000, description: '20% Off ZM Luxury Pret & Couture' },
  ZM2026: { percent: 20, minOrder: 8000, description: '20% Special ZM VIP Code' },
};
