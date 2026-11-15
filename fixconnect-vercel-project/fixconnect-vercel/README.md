# FixConnect — IIT Patna

Responsive Next.js recreation of the FixConnect campus repair website.

## Run locally
1. Install Node.js 20 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and configure Gmail SMTP.
4. Run `npm run dev` and open http://localhost:3000.

## Deploy to Vercel
1. Upload this project to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and deploy.
3. Add the variables from `.env.example` under Project Settings → Environment Variables.
4. Redeploy after adding environment variables.

## Gmail delivery
The request API sends form details and the uploaded payment proof to the configured team addresses using Gmail SMTP. Enable 2-Step Verification and create a Gmail App Password. Use it as `SMTP_PASS`; never commit `.env.local`.

## Important
- The payment QR is cropped from the screenshot supplied in this chat. Test-scan it before publishing; a clean original QR image is preferable.
- Payment is not verified automatically. The team must manually check uploaded proof.
- The site displays the UPI QR and collects proof; it does not process payments.
- Confirm payment and team details before going live.
