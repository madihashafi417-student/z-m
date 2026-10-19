export type ProductCategory = 'all' | 'winter' | 'unstitched' | 'pret' | 'festive' | 'mens' | 'shawls';

export type PieceCount = '1-Piece' | '2-Piece' | '3-Piece';

export type BottomStyle = 'Straight Pant' | 'Traditional Shalwar' | 'Cigarette Pant' | 'Tulip Shalwar' | 'Gharara / Flared';

export type StitchingType = 'unstitched' | 'standard' | 'custom';

export interface StitchingMeasurements {
  kameezLength: string; // inches
  chest: string; // inches
  waist: string; // inches
  hip: string; // inches
  sleevesLength: string; // inches
  shoulder: string; // inches
  trouserLength: string; // inches
  bottomStyle: BottomStyle;
  specialInstructions?: string;
}

export interface Product {
  id: string;
  title: string;
  urduTitle: string;
  collection: string;
  category: 'unstitched' | 'pret' | 'festive' | 'mens' | 'shawls' | 'winter';
  pieceCount: PieceCount;
  fabric: string;
  workType: string;
  pricePKR: number;
  originalPricePKR?: number;
  images: string[];
  inStock: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  color: string;
  colorHex: string;
  description: string;
  fabricDetails: {
    front: string;
    back: string;
    sleeves: string;
    dupatta: string;
    trouser: string;
    additionalBorders?: string;
  };
  stitchingAvailable: boolean;
  stitchingPrices: {
    standard: number; // PKR
    custom: number; // PKR
  };
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  stitchingType: StitchingType;
  selectedSize?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  customMeasurements?: StitchingMeasurements;
  itemPricePKR: number;
}

export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from PKR
  format: (amountInPKR: number) => string;
}

export interface CustomerShippingAddress {
  fullName: string;
  phone: string; // 03XX-XXXXXXX or +92
  email: string;
  city: string;
  province: string;
  streetAddress: string;
  nearestLandmark?: string;
  deliveryNotes?: string;
}

export type PaymentMethodType = 'cod' | 'jazzcash' | 'easypaisa' | 'bank_raast' | 'card';

export interface OrderRecord {
  orderId: string;
  trackingNumber: string;
  courierName: string;
  date: string;
  items: CartItem[];
  shippingAddress: CustomerShippingAddress;
  paymentMethod: PaymentMethodType;
  subtotalPKR: number;
  discountPKR: number;
  shippingFeePKR: number;
  totalPKR: number;
  status: 'Confirmed' | 'Processing at Lahore Warehouse' | 'Handed over to Courier' | 'In Transit' | 'Out for Delivery' | 'Delivered';
}
