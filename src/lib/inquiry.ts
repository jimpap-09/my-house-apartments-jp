export async function submitInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
}) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const whatsappUrl = `https://wa.me/1234567890?text=Hello, I want to book: ${JSON.stringify(data)}`;
  return { whatsappUrl };
}
