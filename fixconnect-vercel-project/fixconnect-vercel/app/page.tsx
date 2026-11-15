 "use client";

import { useMemo, useState } from "react";

const services = [
  { icon: "⚡", name: "Electrical", price: "From ₹99", count: "2 providers", desc: "Fans, coolers, switches, wiring, and small electrical fixes." },
  { icon: "◉", name: "Appliances", price: "From ₹149", count: "3 providers", desc: "Coolers, irons, kettles, mixers, and everyday hostel appliances." },
  { icon: "⚙", name: "Cycles & bags", price: "From ₹79", count: "4 providers", desc: "Flat tyres, brakes, zips, locks, straps, and quick fixes." },
  { icon: "▣", name: "Tech support", price: "Ask for estimate", count: "Campus support", desc: "Wi-Fi, LAN, accessories, and setup support around your room." }
];
const team = [
  ["AV Reddy", "Customer support and technical help", "anuguvarshithreddy@gmail.com"],
  ["Sai Nikhil", "Customer support and technical help", "nikhil12051514@gmail.com"],
  ["Abdur Rehman", "Customer support and technical help", "variablehaze.31@gmail.com"],
  ["Saksham Agarwal", "Payments, requests, and coordination", "agarwalsaksham410@gmail.com"],
  ["Pranay Dev", "Customer support and technical help", "devpranay878947@gmail.com"]
];
const faqs = [
  ["Does FixConnect repair the item directly?", "We coordinate with local providers and help you choose the right option. The first pilot uses a human-in-the-loop workflow."],
  ["How do estimates work?", "We share an expected range based on the category and provider before you confirm. Any change should be explained first."],
  ["Where is it available?", "The student pilot is designed for IIT Patna hostel residents and nearby campus requests."],
  ["What if I’m unsure which category to choose?", "Choose “Other small service” and describe the issue. A coordinator will route it to the right person."],
  ["What is the booking fee?", "A mandatory ₹50 booking fee is required before a support request is sent. Scan the QR, upload the payment proof, and then submit."],
  ["Can I contact the team directly?", "Yes. Use the Support section to call or email any FixConnect team member."]
];

export default function Home() {
  const [basket, setBasket] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [faq, setFaq] = useState<number | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const filtered = useMemo(() => services.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.desc.toLowerCase().includes(query.toLowerCase())), [query]);

  function addService(name: string) {
    setBasket(old => old.includes(name) ? old : [...old, name]);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  }
  async function submitRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("services", basket.join(", "));
    setBusy(true); setStatus("");
    try {
      const response = await fetch("/api/request", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send request.");
      setStatus("Request sent! The FixConnect team will contact you after checking the payment proof.");
      form.reset(); setBasket([]);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Something went wrong. Please email the team directly.");
    } finally { setBusy(false); }
  }

  return <main>
    <div className="topline"><span>⌖ &nbsp; Deliver to <b>H7 Hostel</b> · IIT Patna campus</span><span className="open">● &nbsp; Campus pilot</span></div>
    <header className="nav wrap">
      <a className="brand" href="#">✦FixConnect<span>.</span></a>
      <nav><a href="#services">Services</a><a href="#how">How it works</a><a href="#support">Support</a></nav>
      <a className="navbtn" href="#request">Book a repair ↗</a>
    </header>

    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><i/> IIT PATNA'S CAMPUS REPAIR COMPANION</div>
        <h1>Small repair.<br/><em>Zero runaround.</em></h1>
        <p>Find a trusted local provider, see the estimate upfront, and get your repair moving from your hostel — all through one simple hub.</p>
        <div className="actions"><a className="primary" href="#request">Book a repair <span>↗</span></a><a className="textlink" href="#services">Explore services</a></div>
        <div className="proof"><div className="avatars"><b>A</b><b>R</b><b>S</b><b>N</b></div><div><strong>Built around student reality.</strong><small>Tested with IIT Patna hostel residents.</small></div></div>
      </div>
      <div className="hero-card">
        <div className="mini-label">FIXCONNECT / HOSTEL 7</div>
        <h2>What needs<br/>fixing today?</h2>
        <label className="search">⌕ <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for a repair or service"/></label>
        <div className="quick-list">{filtered.slice(0,3).map(s=><button key={s.name} className="quick" onClick={()=>addService(s.name)}><span className="service-icon">{s.icon}</span><span><b>{s.name}</b><small>{s.price} · {s.count}</small></span><span className="arrow">↗</span></button>)}</div>
        <div className="trust"><span>✓</span><div><b>Vetted for campus</b><small>Ratings from students, clear estimates, and no mystery charges.</small></div></div>
      </div>
    </section>

    <section className="stats wrap"><div><strong>81.8%</strong><span>of students we spoke to faced a repair issue recently.</span></div><div><strong>15–30 <small>min</small></strong><span>target response window for new requests.</span></div><div><strong>₹50</strong><span>one-time booking fee to get your request moving.</span></div></section>

    <section id="services" className="section wrap">
      <div className="section-head"><div><div className="eyebrow">BROWSE THE FIXCONNECT STORE</div><h2>Pick a service</h2></div><p>Tap a category, add it to your repair basket, and share the details once. Your coordinator handles the matching.</p></div>
      <div className="service-grid">{services.map(s=><article className="service-card" key={s.name}><div className="service-icon big">{s.icon}</div><div className="tag">VERIFIED</div><h3>{s.name}</h3><p>{s.desc}</p><div className="service-bottom"><b>{s.price}</b><button onClick={()=>addService(s.name)}>{basket.includes(s.name)?"Added ✓":"Add to request →"}</button></div></article>)}</div>
    </section>

    <section id="how" className="how">
      <div className="wrap"><div className="eyebrow">A CALMER REPAIR JOURNEY</div><h2>Three steps. Done.</h2><p className="lead">FixConnect handles the coordination that usually gets stuck between “I need help” and “it’s working again.”</p>
      <div className="steps">{[["01","Tell us what broke","Share your hostel, category, and a few words about the issue. Your payment proof can be uploaded with the request."],["02","Choose with clarity","We send a nearby, reviewed provider and an upfront estimate so you can decide with confidence."],["03","Track the fix","Get simple updates while we coordinate pickup, visit, or drop-off at your convenience."]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
      <blockquote>“I tried contacting an electrician but I didn’t know anyone. I asked my friends and had no contacts, so my problem didn’t solve.”<small>Student response from our early problem discovery · IIT Patna</small></blockquote></div>
    </section>

    <section className="friction wrap"><div><div className="eyebrow">WHY FIXCONNECT EXISTS</div><h2>Designed around<br/>the friction.</h2><p>Our first conversations with 22 students pointed to the same four moments of friction — discovery, trust, distance, and delay. The product starts there.</p></div><div className="metric-list"><div><b>18/22</b><span>students had a repair or small-service problem in the past six months</span></div><div><b>15/18</b><span>rated the experience at least 3 out of 5 for inconvenience</span></div><div><b>5 students</b><span>each mentioned distance, trust, delay, or not knowing where to go</span></div><div><b>₹10–₹50</b><span>acceptable convenience-fee range for half of valid responses</span></div><small>Early discovery sample · n = 22. Figures describe our student conversations, not campus-wide prevalence.</small></div></section>

    <section id="request" className="request-section"><div className="wrap request-layout"><div className="request-copy"><div className="eyebrow">READY WHEN YOU ARE</div><h2>Let’s get your<br/><em>repair moving.</em></h2><p>Submit a request and a FixConnect coordinator will follow up with the next best option. This student pilot is currently focused on IIT Patna hostels.</p><ul><li>✓ ₹50 booking fee before a request is sent</li><li>✓ Upload payment proof to unlock the request</li><li>✓ Email delivery to the FixConnect team</li></ul><a href="mailto:agarwalsaksham410@gmail.com">Email Saksham directly ↗</a></div>
      <form className="form-card" onSubmit={submitRequest}>
        <h3>Request a repair</h3><p>Give us the basics. We’ll take it from there.</p>
        <div className="form-grid"><label>Your name<input name="name" placeholder="e.g. Ananya" required/></label><label>Phone number<input name="phone" type="tel" placeholder="98765 43210" required/></label><label>Email (optional)<input name="email" type="email" placeholder="you@example.com"/></label><label>Hostel / room<input name="hostel" placeholder="e.g. H7 · 214" required/></label><label>What needs fixing?<select name="category" required defaultValue=""><option value="" disabled>Select a category</option>{services.map(s=><option key={s.name}>{s.name}</option>)}<option>Other small service</option></select></label><label>Best time<select name="time" defaultValue="Anytime"><option>Anytime</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div>
        <label className="full">What happened?<textarea name="details" rows={3} placeholder="Describe the issue briefly..." required/></label>
        {basket.length>0&&<div className="basket-note"><b>Added to request:</b> {basket.join(", ")}</div>}
        <div className="pay-box"><div><b>₹50 booking fee required</b><p>Scan this QR with any UPI app, then upload the payment screenshot. The request stays locked until proof is attached.</p><button type="button" className="qr-toggle" onClick={()=>setQrOpen(!qrOpen)}>{qrOpen?"Hide":"Show"} ₹50 QR ↗</button></div>{qrOpen&&<div className="qr"><img src="/payment-qr.png" alt="FixConnect ₹50 UPI payment QR"/><b>Scan to pay ₹50</b><small>UPI ID: 8979476276-2@ybl</small></div>}</div>
        <label className="full">Upload payment screenshot (required)<input name="paymentProof" type="file" accept="image/*,.pdf" required/></label>
        <label className="full">UTR / transaction reference (optional)<input name="utr" placeholder="e.g. 412345678901"/></label>
        <button className="primary submit" disabled={busy}>{busy?"Sending…":"Upload proof to send request ↗"}</button>
        {status&&<p className="status" role="status">{status}</p>}
        <small className="privacy">Your request, contact details, and payment screenshot will be sent to the FixConnect team. Payment proof is checked manually.</small>
      </form></div></section>

    <section className="upi wrap"><div><div className="eyebrow">PAY AFTER YOUR ESTIMATE</div><h2>Fast UPI checkout</h2><p>Send the approved repair amount directly to FixConnect using any UPI app.</p></div><div className="upi-card"><code>8979476276-2@ybl</code><button onClick={()=>navigator.clipboard.writeText("8979476276-2@ybl")}>Copy UPI ID</button><a href="upi://pay?pa=8979476276-2@ybl&pn=FixConnect">Pay via UPI ↗</a></div></section>

    <section id="support" className="support wrap"><div className="eyebrow">HUMAN HELP, CLOSE BY</div><h2>Contact the team.</h2><p className="lead">For support, payment confirmation, or technical help, contact any team member directly.</p><div className="team-grid">{team.map((m,i)=><article key={m[0]}><div className="person">{m[0].split(" ").map(x=>x[0]).join("")}</div><h3>{m[0]}</h3><p>{m[1]}</p><a href={`mailto:${m[2]}`}>Email ↗</a></article>)}</div><small>Please share the request category and your hostel location when contacting the team. Contact details are published with the team’s permission.</small></section>

    <section className="faq-section"><div className="wrap faq-wrap"><div><div className="eyebrow">QUESTIONS, ANSWERED</div><h2>Good to know.</h2></div><div className="faq-list">{faqs.map((f,i)=><article key={f[0]}><button onClick={()=>setFaq(faq===i?null:i)}>{f[0]}<span>{faq===i?"−":"+"}</span></button>{faq===i&&<p>{f[1]}</p>}</article>)}</div></div></section>
    <footer className="wrap footer"><a className="brand" href="#">✦FixConnect<span>.</span></a><span>Student-built · IIT Patna</span><a href="#services">Services</a><a href="#how">How it works</a><a href="#support">Support</a><a href="mailto:agarwalsaksham410@gmail.com">Contact</a></footer>
    <div className="mobile-book"><span>{basket.length} services selected</span><a href="#request">Book a repair ↗</a></div>
  </main>;
}
