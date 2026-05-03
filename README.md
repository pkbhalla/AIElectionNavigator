# AI Election Navigator India 🗳️🇮🇳

An AI-powered civic education platform that helps Indian citizens understand the election process — from voter registration to result declaration — in an interactive, multilingual, and accessible way.

**Strictly non-partisan. Educational only.**

---

## Features

| Feature | Description |
|---|---|
| 🗺️ **Guided Journeys** | Personalized checklists for first-time voters, registered voters, students, and citizens |
| 📅 **Election Lifecycle** | Interactive visual timeline of all election stages |
| 🗳️ **Polling Day Simulator** | Step-by-step walkthrough of the actual polling booth experience |
| 📊 **Counting & Results** | Clear explanation of EVM counting and FPTP result declaration |
| 🤖 **AI Assistant** | Gemini-powered civic Q&A, grounded in ECI knowledge, strictly non-partisan |
| ❌ **Myths vs Facts** | Busts common election misinformation |
| 🔐 **Trust Guardrails** | AI refuses partisan prompts and political advice |

---

## How AI is Used

The AI assistant uses **Google Gemini 1.5 Flash** with a comprehensive system prompt that:
- Restricts responses to Indian election process education only
- Refuses all partisan prompts (party recommendations, outcome predictions)
- Grounds answers in ECI public knowledge (EVM, VVPAT, voter registration, etc.)
- Encourages users to verify at official ECI sources
- Maintains simple, accessible language for all literacy levels

---

## Running Locally

### Prerequisites
- Node.js 20+
- A Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-election-navigator.git
cd ai-election-navigator

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for the AI assistant |
| `NEXT_PUBLIC_APP_URL` | No | Your deployed app URL |

---

## Deploying to Google Cloud Run

### Option A: Cloud Run Continuous Deployment (Recommended)

1. Push this repo to GitHub.
2. Go to [Google Cloud Console → Cloud Run](https://console.cloud.google.com/run).
3. Click **Create Service → Continuously deploy from a repository**.
4. Connect your GitHub account and select this repository.
5. Set branch to `main`, build type to **Dockerfile**.
6. Under **Variables & Secrets**, add `GEMINI_API_KEY` as a Secret Manager secret.
7. Set port to `3000`, memory to `512Mi`.
8. Click **Create** — every push to `main` will auto-deploy.

### Option B: GitHub Actions

This repo includes `.github/workflows/deploy.yml` using Workload Identity Federation (recommended over service account keys).

#### One-time setup

```bash
# Enable required APIs
gcloud services enable run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com

# Create Artifact Registry repository
gcloud artifacts repositories create cloud-run-source-deploy \
  --repository-format=docker \
  --location=asia-south1

# Store Gemini API key in Secret Manager
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=-

# Create a service account for deployments
gcloud iam service-accounts create github-deploy-sa \
  --display-name="GitHub Deploy SA"

# Grant required permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-deploy-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-deploy-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-deploy-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-deploy-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

#### Workload Identity Federation (keyless auth)

```bash
# Create Workload Identity Pool
gcloud iam workload-identity-pools create "github-pool" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Create Provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Allow the GitHub repo to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding \
  "github-deploy-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_USERNAME/ai-election-navigator"
```

#### GitHub Secrets Required

Add these to your GitHub repository secrets:

| Secret | Value |
|---|---|
| `GCP_PROJECT_ID` | Your Google Cloud project ID |
| `WIF_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `WIF_SERVICE_ACCOUNT` | `github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com` |

---

## Option C: Cloud Build Trigger

Use `cloudbuild.yaml` included in this repo:

```bash
# Create Cloud Build trigger
gcloud builds triggers create github \
  --repo-name=ai-election-navigator \
  --repo-owner=YOUR_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

---

## Project Structure

```
ai-election-navigator/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── journey/page.tsx      # User journey/checklist
│   │   ├── lifecycle/page.tsx    # Election lifecycle timeline
│   │   ├── simulator/page.tsx    # Polling day simulator
│   │   ├── counting/page.tsx     # Counting & results
│   │   ├── assistant/page.tsx    # AI chat assistant
│   │   ├── myths/page.tsx        # Myths vs facts
│   │   ├── about/page.tsx        # About & transparency
│   │   └── api/chat/route.ts     # AI API endpoint
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation
│   │   └── Footer.tsx            # Footer with official links
│   └── lib/
│       └── electionContent.ts    # All election education content
├── Dockerfile                    # Cloud Run deployment
├── cloudbuild.yaml               # Cloud Build CI/CD
├── .github/workflows/deploy.yml  # GitHub Actions CI/CD
└── .env.example                  # Environment variable template
```

---

## Constraints & Guardrails

- **Non-partisan**: Never recommends parties, candidates, or political opinions
- **Process-only**: AI restricted to election process education
- **Fact-labeled**: All content clearly marked as general guidance, not official instructions
- **Official sources linked**: All pages link to ECI official resources
- **Rate limited**: API endpoint includes basic rate limiting

---

## License

MIT — Free to use for civic education and public good purposes.

**Important**: This is not an official Election Commission of India product. For official information, always refer to [eci.gov.in](https://eci.gov.in).
