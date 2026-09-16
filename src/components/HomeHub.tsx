import {
  ArrowUpRight, Camera, CarFront, ContactRound, Cpu, Gauge, HeartHandshake, Mail, MapPin, Phone, Play, ScanLine, Wrench,
} from "lucide-react";

const destinations = [
  { title: "Services", text: "Maintenance, repair & care", href: "/services", icon: Wrench },
  { title: "Booking", text: "Start your service request", href: "/booking", icon: CarFront },
  { title: "About DAD", text: "Independent, engineering-led", href: "/about", icon: ContactRound },
  { title: "Our Vision", text: "The standard we are building", href: "/vision", icon: HeartHandshake },
  { title: "Why Choose DAD", text: "A more considered workshop", href: "/why-choose-dad", icon: ScanLine },
  { title: "Technology", text: "Diagnostics with intent", href: "/technology", icon: Cpu },
  { title: "Performance", text: "Tuning with restraint", href: "/performance", icon: Gauge },
  { title: "Founders", text: "The people behind DAD", href: "/founders", icon: ContactRound },
];

export function HomeHub() {
  return (
    <section className="hub-section content-wrap" aria-labelledby="hub-title">
      <div className="hub-heading">
        <div><p className="eyebrow">DAD / Explore</p><h2 id="hub-title">Explore <span>DAD.</span></h2></div>
        <p>Eight ways into the DAD standard. Choose a discipline and go deeper.</p>
      </div>
      <div className="hub-grid">
        {destinations.map(({ title, text, href, icon: Icon }, index) => (
          <a className="hub-card" href={href} key={title}>
            <span className="hub-card-top"><span>0{index + 1}</span><Icon size={26} strokeWidth={1.5} /></span>
            <span className="hub-card-title">{title}</span>
            <span className="hub-card-text">{text}</span>
            <span className="hub-card-action">Explore <ArrowUpRight size={15} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta" id="contact" aria-labelledby="contact-cta-title">
      <div className="content-wrap final-cta-inner">
        <div>
          <p className="eyebrow">DAD / Contact DAD</p>
          <h2 id="contact-cta-title">Deutsche Auto<br /><span>Den.</span></h2>
          <p className="final-cta-tagline">DAD MEETS YOUR CAR NEEDS</p>
        </div>
        <div className="final-cta-side">
          <div className="final-contact-list">
            <a href="https://maps.app.goo.gl/XkDGHJzZ2Y3i8Zq38" target="_blank" rel="noreferrer"><MapPin size={15} /><span><small>Find DAD</small>Hyderabad</span></a>
            <a href="tel:+919989195454"><Phone size={15} /><span><small>Call DAD</small>+91 9989195454</span></a>
            <a href="mailto:contact@deutscheautoden.com"><Mail size={15} /><span><small>Email DAD</small>contact@deutscheautoden.com</span></a>
            <a href="https://www.instagram.com/deutsche_auto_den/" target="_blank" rel="noreferrer"><Camera size={15} /><span><small>Instagram</small>@deutsche_auto_den</span></a>
            <a href="http://www.youtube.com/@DeutscheAutoDen" target="_blank" rel="noreferrer"><Play size={15} /><span><small>YouTube</small>Deutsche Auto Den</span></a>
          </div>
          <a className="brand-button" href="/booking">Book your service <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}