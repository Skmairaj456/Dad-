"use client";

export function RsaButton() {
  return (
    <a className="rsa-float" href="/rsa" aria-label="Roadside Assistance" title="Roadside Assistance">
      <span className="rsa-siren" aria-hidden="true">
        <span className="rsa-siren-dome"><span className="rsa-siren-sweep" /></span>
        <span className="rsa-siren-neck" />
        <span className="rsa-siren-base"><i /><i /><i /></span>
      </span>
      <span className="rsa-float-label"><strong>RSA</strong><small>EMERGENCY</small></span>
    </a>
  );
}