# Vivek Vyas — Portfolio

Personal portfolio website built with HTML, CSS, and JavaScript, deployed on AWS using S3, CloudFront, Lambda, API Gateway, and DynamoDB.

**Live:** https://d2m57b3t7854fc.cloudfront.net

---

## Features

- Responsive single-page design with smooth scroll navigation
- Sections for About, Skills, Experience, Projects, and Certifications
- Contact form that saves messages to DynamoDB and sends an email notification via SES
- Resume download
- Auto-deploys to AWS on every push to `main` via GitHub Actions

---

## Tech Stack

### Frontend
- HTML, CSS, JavaScript (vanilla)
- Hosted on Amazon S3 (static website hosting)
- Served via Amazon CloudFront (HTTPS + CDN)

### Backend (Contact Form)
- **AWS Lambda** — Python function that handles form submissions
- **Amazon API Gateway** — exposes a public POST `/contact` endpoint
- **Amazon DynamoDB** — stores every contact form submission
- **Amazon SES** — sends an email notification on each submission

### CI/CD
- **GitHub Actions** — syncs files to S3 and invalidates CloudFront cache on every push to `main`

---

## How It Works

```
Visitor fills contact form
        ↓
POST request → API Gateway
        ↓
Lambda function runs
        ↓
Saves to DynamoDB + sends email via SES
```

For the frontend:
```
git push to main
        ↓
GitHub Actions workflow triggers
        ↓
Files synced to S3
        ↓
CloudFront cache invalidated
        ↓
Live site updated
```

---

## AWS Infrastructure

| Service | Purpose |
|---|---|
| S3 | Stores and serves static files |
| CloudFront | HTTPS, CDN, caching |
| API Gateway | Public endpoint for contact form |
| Lambda | Backend logic (Python) |
| DynamoDB | Stores contact form submissions |
| SES | Email notifications |
| IAM | Permissions for Lambda and GitHub Actions |

---

## Local Development

No build step needed — plain HTML/CSS/JS.

```bash
git clone https://github.com/Vvivekvyas/portfolio.git
cd portfolio
# Open index.html in your browser
```

To test the contact form locally, either update the API URL in `script.js` to your API Gateway endpoint or use a tool like Live Server in VS Code.

---

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`).

Every push to `main`:
1. AWS credentials are loaded from GitHub Secrets
2. Files are synced to the S3 bucket (`aws s3 sync`)
3. CloudFront cache is invalidated so changes are live immediately

Manual deploy (if needed):
```bash
aws s3 sync . s3://vivek-portfolio-site --exclude ".git/*" --exclude ".github/*" --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Contact

**Vivek Vyas**  
[linkedin.com/in/vivek-vyas](https://linkedin.com/in/vivek-vyas) · [github.com/Vvivekvyas](https://github.com/Vvivekvyas) · vivekvyas2304@gmail.com
