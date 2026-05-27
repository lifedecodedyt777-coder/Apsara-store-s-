const WHATSAPP_NUMBER = "919960998672";

export function buildWhatsAppOrderUrl(product: {
  name: string;
  price: number;
  description: string;
  category?: string;
  id: number;
}): string {
  const baseUrl = window.location.origin;
  const productUrl = `${baseUrl}/products/${product.id}`;
  const message = `Hello Apsara Store! 🛍️\n\nI'd like to order:\n\n*${product.name}*\nPrice: ₹${product.price}\nCategory: ${product.category ?? "Beauty"}\n\nDescription: ${product.description}\n\nProduct Link: ${productUrl}\n\nPlease confirm availability and delivery details. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppContactUrl(message?: string): string {
  const text = message ?? "Hello Apsara Store! I'd like to know more about your products.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}