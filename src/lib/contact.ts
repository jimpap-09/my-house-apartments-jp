export const CONTACT = {
  phone: "+30 123 456 7890",
  phoneDisplay: "+30 123 456 7890",
  address: "Ampelokipoi, Athens, Greece",
  addressShort: "Ampelokipoi, Athens",
  mapsLink: "https://maps.google.com/?q=Ampelokipoi,Athens",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.123456789!2d23.7654321!3d37.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU5JzE1LjYiTiAyM8KwNDUnNTUuMyJF!5e0!3m2!1sen!2sgr!4v1234567890123!5m2!1sen!2sgr",
};

export const telHref = `tel:${CONTACT.phone}`;

export function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.phone.replace(/\s+/g, "")}?text=${encoded}`;
}
