# **App Name**: Alerta Consumidor Web

## Core Features:

- Structured Consumer Reports: Allow users to submit structured, factual reports describing their consumer experience.
- Dynamic Company Information Pages: Automatically generate a public page for each company, displaying company data, status, timeline of events, aggregated KPIs, public consumer reports, and curated public news references.
- Key Performance Indicators (KPIs): Calculate and display objective indicators, updated over time: TMR (Time to Resolution), SD (Silence Documented), TRPE (Resolution After Escalation), and Monthly trend of submitted reports.
- Public News Feed (Curated): Admin-managed news feed referencing publicly available news, official statements, or regulatory actions. Includes title, source, publication date, short neutral summary, and direct link to the original source.
- Admin Moderation Panel: Secure admin dashboard with the ability to: Review, approve, edit, or reject consumer reports; remove offensive language or personal data; flag reports as unverified; manage company records and categories; curate and update the public news feed; audit actions with moderation logs.
- Data Storage and Infrastructure (Firebase): Firestore: Stores structured data (companies, reports, KPIs, events, news). Firebase Storage: Stores uploaded evidence securely and privately. Firebase Auth: Manages administrator authentication and access control. Cloud Functions: Automates KPI calculations, daily aggregations, and data updates. Hosting: Delivers a fast, SEO-friendly, responsive web application.
- Admin Reporting & Data Export: Generate CSV exports of moderated and aggregated data. Designed for regulatory reporting, institutional analysis, and internal audits. Export respects privacy and excludes personal identifiers.

## Style Guidelines:

- Primary Color: Deep red #D90429 Represents alert, attention, and public relevance.
- Background Color: Light red #F2B7BD Provides a clean and subtle visual base.
- Accent Color: Dark red #A6031C Used for calls to action and key highlights.
- Font Family: Poppins, sans-serif Usage: Bold, clear headlines Highly legible body text Emphasis on hierarchy, spacing, and accessibility.
- Flat white icons: Alert, Magnifying glass, Clock, Document, Graph
- Rounded cards with high contrast for data presentation. Clean grid layout with generous spacing.
- Subtle animations: Loading indicators, Data updates, Hover and focus states. Animations should enhance clarity, never distract.