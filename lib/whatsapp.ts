import type { CartItem } from "./store";
import { formatINR, getProduct } from "./products";

export type WhatsAppCustomerDetails = {
  name: string;
  whatsapp: string;
  email: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pin: string;
};

type WhatsAppOrderDetails = {
  orderId: string;
  cart: CartItem[];
  customer: WhatsAppCustomerDetails;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

export function generateOrderId(now = new Date()) {
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const storageKey = `zaria_order_sequence_${date}`;

  let sequence: number;
  try {
    sequence = Number(window.localStorage.getItem(storageKey) ?? 0) + 1;
    window.localStorage.setItem(storageKey, String(sequence));
  } catch {
    sequence = Date.now() % 1000 || 1;
  }

  return `ZA-${date}-${String(sequence).padStart(3, "0")}`;
}

function formatWhatsAppNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (value.trim().startsWith("+")) return `+${digits}`;
  return digits.startsWith("91") ? `+${digits}` : `+91${digits}`;
}

export function generateWhatsAppOrderMessage({
  orderId,
  cart,
  customer,
  subtotal,
  discount,
  shipping,
  total,
}: WhatsAppOrderDetails) {
  const orderItems = cart.flatMap((item, index) => {
    const product = getProduct(item.productId);
    if (!product) return [];

    return [
      [
        `${index + 1}. ${product.name}`,
        `Size: ${item.size}`,
        `Quantity: ${item.qty}`,
        `Price: ${formatINR(product.price)}`,
        `Subtotal: ${formatINR(product.price * item.qty)}`,
      ].join("\n"),
    ];
  });

  const address = [customer.address, customer.apartment]
    .filter(Boolean)
    .join(", ");

  return [
    "Hello Zaria Atelier,",
    "",
    "I would like to place an order.",
    "",
    `ORDER ID: ${orderId}`,
    "",
    "ORDER DETAILS",
    "",
    ...orderItems,
    "",
    "----------------------------",
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    `Discount: ${formatINR(discount)}`,
    `Shipping: ${formatINR(shipping)}`,
    `TOTAL: ${formatINR(total)}`,
    "",
    "CUSTOMER DETAILS",
    "",
    `Name: ${customer.name}`,
    `WhatsApp: ${formatWhatsAppNumber(customer.whatsapp)}`,
    `Email: ${customer.email}`,
    "",
    "DELIVERY ADDRESS",
    "",
    `Address: ${address}`,
    `City: ${customer.city}`,
    `State: ${customer.state}`,
    `PIN: ${customer.pin}`,
    "",
    "Thank you.",
  ].join("\n");
}

export function createWhatsAppOrderUrl(message: string) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const digits = phoneNumber?.replace(/\D/g, "");

  if (!digits) {
    throw new Error("WhatsApp checkout is not configured.");
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}