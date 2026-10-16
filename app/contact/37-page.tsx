import { config } from "@/restaurant.config";
export default function Contact() {
  return <div className="mx-auto max-w-3xl px-4 py-10"><h1 className="font-display text-4xl">Find us</h1><div className="card mt-6 space-y-3 p-6"><p>📍 {config.address}</p><p>🕛 {config.hours}</p><p>📞 <a className="text-saffron underline" href={`tel:${config.phone.replace(/\s/g, "")}`}>{config.phone}</a></p><a className="btn btn-gold" href={`https://wa.me/${config.whatsapp}`}>Message on WhatsApp</a></div></div>;
}
