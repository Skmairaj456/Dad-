"use client";

import { ArrowUpRight, BatteryCharging, CircleGauge, Droplets, ShieldCheck, Wrench } from "lucide-react";

const groups = [
  { title: "Maintenance", icon: Droplets, items: ["General Service & Maintenance", "Oil & Filter Service", "Preventive Maintenance", "Pre-Purchase Inspection", "Detailing & Ceramic Coating"] },
  { title: "Diagnostics & Repair", icon: Wrench, items: ["Engine Diagnostics", "Engine Repair", "Transmission / Gearbox Service", "Clutch Repair & Replacement", "AC Service & Repair", "Cooling System / Radiator"] },
  { title: "Brakes & Handling", icon: ShieldCheck, items: ["Brake Service & Upgrades", "Suspension & Handling", "Wheel Alignment", "Tyre Service", "Electrical & Battery"] },
  { title: "Performance", icon: CircleGauge, items: ["Performance Tuning", "ECU Remapping", "Exhaust & Performance Systems", "Track Preparation", "Performance Upgrades"] },
  { title: "Roadside Assistance", icon: BatteryCharging, items: ["Roadside Assistance (RSA) - Chargeable", "Other / Custom Requirement"] },
];

export function ServicesPageContent() {
  return (
    <div className="service-groups">
      {groups.map(({ title, icon: Icon, items }) => (
        <section className="service-group" key={title}>
          <div className="service-group-title">
            <Icon size={25} />
            <h2>{title}</h2>
          </div>
          <div className="service-items">
            {items.map((item) => {
              const queryValue = encodeURIComponent(item);
              return (
                <a href={`/booking?service=${queryValue}`} key={item}>
                  <span>{item}</span>
                  <ArrowUpRight size={16} />
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}