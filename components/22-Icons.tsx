const P = ({ d, size = 20 }: { d: string; size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
export const icons: Record<string, string> = {
  cart: "M3 4h2l2.4 11h10.2L20 7H6M9 20a1 1 0 1 0 0 .01M17 20a1 1 0 1 0 0 .01",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  menu: "M6 3v8a3 3 0 0 0 3 3v7M9 3v6M12 3v8a3 3 0 0 1-3 3M18 3c-2 2-3 5-3 8h3v10",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  tag: "M3 12V3h9l9 9-9 9zM7.5 7.5h.01",
  pin: "M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 1 0 0-.01",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  chat: "M4 5h16v11H9l-5 4z",
};
export const Icon = ({ n, size }: { n: keyof typeof icons; size?: number }) => <P d={icons[n]} size={size} />;
