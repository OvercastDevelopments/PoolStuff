# DNS record of poolstuff.co.nz — before the Vercel cutover

Captured 2026-08-19 by querying live DNS, not transcribed from the control panel.
Registrar/DNS host: **Crazy Domains** (nameservers `ns.freeparking.co.nz`,
`ns2.freeparking.co.nz`). TTL on every record is **300 seconds**, so any change
here — including undoing one — takes effect in about five minutes.

## To roll back to the pre-Vercel state

Change **only these two rows** back. Everything else was never touched.

| Type | Name | Restore to |
|---|---|---|
| A | `poolstuff.co.nz` | `74.91.195.151` |
| A | `www.poolstuff.co.nz` | `74.91.195.151` |

If a `www` CNAME was added for Vercel, delete it first — `www` cannot hold both
a CNAME and an A record.

## Full record set as it stood before any change

| Type | Name | Value | Purpose |
|---|---|---|---|
| A | `poolstuff.co.nz` | `74.91.195.151` | **Website** — Crazy Domains shared hosting (`sh00030.cd.ds.network`) |
| A | `www.poolstuff.co.nz` | `74.91.195.151` | **Website** — same host |
| CNAME | `autodiscover` | `autodiscover.outlook.com` | Microsoft 365 — Outlook client auto-config |
| CNAME | `enterpriseenrollment` | `enterpriseenrollment.manage.microsoft.com` | Microsoft Intune device enrolment |
| CNAME | `enterpriseregistration` | `enterpriseregistration.windows.net` | Entra ID / Azure AD device join |
| CNAME | `lyncdiscover` | `webdir.online.lync.com` | Microsoft Teams |
| CNAME | `msoid` | `clientconfig.microsoftonline-p.net` | Microsoft sign-in |
| CNAME | `sip` | `sipdir.online.lync.com` | Teams calling |
| MX | `poolstuff.co.nz` | `poolstuff-co-nz.mail.protection.outlook.com` (priority 1) | **Email delivery** |
| TXT | `poolstuff.co.nz` | `MS=ms89467032` | Microsoft domain-ownership proof |
| TXT | `poolstuff.co.nz` | `v=spf1 include:spf.protection.outlook.com -all` | SPF — stops outgoing mail being marked spam |

**Only the two A records concern the website.** The other nine are Microsoft 365.
Deleting the MX record stops all incoming mail; deleting either TXT record breaks
mail deliverability or Microsoft's domain verification. Leave all nine alone.

## What the Vercel cutover changes

Values taken from the Vercel dashboard for project `pool-stuff`. The `www` CNAME
hash is unique to that project — copy it from Vercel rather than retyping.

| Type | Name | Set to |
|---|---|---|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `6dd3c375ec2ce42f.vercel-dns-017.com` |

The `www` A record must be deleted before the CNAME can be added. In Vercel,
`www.poolstuff.co.nz` is the Production domain and the apex 308-redirects to it.

## What is being replaced

The current site is **Joomla**, installed in a `/ps/` subdirectory. The document
root serves 66 bytes of JavaScript that redirects into it:

```html
<script type="text/javascript">window.location = "/ps"</script>
```

Pointing DNS at Vercel does not delete it — the files stay on the Crazy Domains
server and become reachable again the moment the two A records are restored.

Pages on the old site with **no equivalent** on the new one:

- `/ps/index.php/e-catalogues` — check for downloadable PDFs before cutting over
- `/ps/index.php/our-products/empex-water-park`
- `/ps/index.php/our-products/wash-down`
- `/ps/index.php/our-products/pool-vacuums` (folded into Pool Cleaning)

Indexed URLs of the form `/ps/index.php/...` will 404 on the new site unless
redirects are added to `next.config.ts`.
