import { Footer } from "@/components/Footer";
import { RsaForm } from "@/components/RsaForm";
import { PageShell } from "@/components/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Roadside Assistance in Hyderabad",
  description: "Request chargeable Roadside Assistance from Deutsche Auto Den in and around Hyderabad.",
  path: "/rsa",
});

export default function RsaPage() {
  return (
    <>
      <PageShell
        eyebrow="Roadside Assistance"
        title={<>RSA — Roadside<br /><span>Assistance.</span></>}
        intro="We provide Roadside Assistance (RSA) in and around Hyderabad."
      >
        <section className="content-band rsa-intro" aria-label="Roadside assistance information">
          <p className="lead-copy">When the road interrupts, give DAD the details we need to respond.</p>
          <p>RSA services are chargeable as per applicable industry standards and based on the nature, location, and assistance required.</p>
        </section>
        <RsaForm />
      </PageShell>
      <Footer />
    </>
  );
}
