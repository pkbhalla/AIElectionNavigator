# Build Prompt: AI Election Navigator for India

Create a production-ready, AI-powered web application called **AI Election Navigator India** that helps users understand the Indian election process, timelines, eligibility, and voting steps in an interactive, multilingual, and easy-to-follow way. The goal is to make the election lifecycle understandable for first-time voters, regular voters, students, and general citizens in India.

This is a hackathon-grade product, so the output must feel polished, modern, demo-friendly, and deployable. Build the complete app with a strong UX, clear information architecture, and a practical deployment setup for **Google Cloud Run** with **automatic build and deployment from a GitHub repository**.

## Product goal

The app should act as a civic assistant that explains:
- how elections work in India,
- what stages happen before, during, and after polling,
- what a voter needs to do,
- how EVM and VVPAT work,
- how counting and results work,
- and what differs between Lok Sabha, Assembly, and local elections.

The app must stay strictly non-partisan. It must never recommend parties, candidates, or political opinions. It should only educate users about the election process, rights, responsibilities, timelines, official steps, and public information.

## India context to support in the app

The application content and flows must reflect the Indian election ecosystem under the Election Commission of India. The user experience should cover major public-facing stages such as:
- voter registration and electoral roll awareness,
- eligibility checking,
- election announcement and timeline understanding,
- nomination, scrutiny, and withdrawal at a high level,
- campaign period and model code awareness at a simple public level,
- polling day steps,
- EVM and VVPAT explanation,
- counting day explanation,
- and result declaration.

The app should also explain the difference between:
- Lok Sabha elections,
- State Assembly elections,
- and local body elections.

Do not present legal advice. Do not fabricate state-specific rules. Where precision is needed, label information as “general guidance” and encourage reference to official election sources.

## Core product concept

Build the product as an **interactive AI-guided web app**, not a plain static site and not only a chat screen.

The app should combine:
- structured guided journeys,
- interactive step-by-step explainers,
- AI-powered Q&A grounded in trusted election-process knowledge,
- visual timeline modules,
- multilingual support,
- and simple simulations for polling day and counting day.

The AI should act as a helpful assistant inside the product, but the rest of the UX should reduce dependency on typing by using guided cards, sections, and clear actions.

## Recommended tech stack

Use the best stack for a polished and maintainable app that can be deployed on Google Cloud Run.

Preferred stack:
- **Frontend**: Next.js 14+ with React and TypeScript
- **Styling**: Tailwind CSS
- **UI patterns**: clean card-based interface, responsive timeline layouts, accessible forms, modal/sheet interactions
- **Backend**: Next.js server actions / route handlers or a separate FastAPI service if needed
- **AI integration**: Gemini or another LLM with retrieval-grounded responses
- **Data layer**: local structured content files or lightweight database, optionally Firestore if needed
- **Deployment**: Dockerized app deployed to Google Cloud Run
- **CI/CD**: automatic deployment from GitHub using Cloud Build trigger or GitHub Actions

The final output should be implementation-ready for Cloud Run and GitHub-based auto deployment.

## App requirements

### 1. Main experiences

Design the app around the following user journeys:

#### A. First-time voter journey
A user selects “I am a first-time voter” and gets a guided checklist that explains:
- who can vote,
- what basic eligibility means,
- how voter registration works at a high level,
- how to verify voter record presence,
- what to carry on polling day,
- what happens inside the polling station,
- and what to expect after voting.

#### B. General election process journey
A visual election lifecycle page should explain the sequence:
- voter list and preparation,
- election schedule announcement,
- nominations,
- scrutiny,
- withdrawal,
- campaign period,
- polling,
- counting,
- result declaration.

Each stage should be shown in plain language with expandable detail.

#### C. Polling day simulator
Create an interactive walkthrough of election day in India. The user should step through:
- arriving at the polling station,
- identity verification,
- voter list confirmation,
- indelible ink,
- using EVM,
- seeing VVPAT confirmation,
- and leaving after casting the vote.

This should be highly visual and beginner-friendly.

#### D. Counting and results explainer
Create a structured module explaining in simple language:
- what happens after polling closes,
- how EVM counting generally works,
- what result rounds mean conceptually,
- how official result declaration works.

#### E. AI election assistant
Include a grounded AI assistant that can answer questions such as:
- “What is EVM?”
- “What is VVPAT?”
- “What happens if my name is missing?”
- “What is the difference between Lok Sabha and Assembly election?”
- “How does counting happen?”

This assistant must reject partisan prompts and redirect users to neutral civic information.

#### F. Myth vs fact section
Add a myth-busting area focused on election process misinformation, for example:
- “Can someone see whom I voted for?”
- “Can I vote without being on the electoral roll?”
- “Does voting happen only in one day for all of India?”

### 2. Multilingual and accessibility support

The app should be designed with India in mind.

Include:
- English as default,
- architecture ready for Hindi and Tamil at minimum,
- easy language mode,
- readable typography,
- mobile-first layout,
- voice-friendly design hooks if TTS is added later,
- strong accessibility support for keyboard navigation and contrast.

### 3. Information design

The app should feel like a trustworthy civic product.

Requirements:
- calm, clean, authoritative UI,
- timeline and stepper-based learning,
- cards and micro-illustrations instead of dense text blocks,
- visually clear separation of “before voting”, “polling day”, and “after polling”,
- content written in plain, non-legal language.

### 4. Trust and guardrails

The app must:
- remain non-partisan,
- avoid political persuasion,
- avoid vote advice,
- avoid winner prediction,
- avoid fake or unverified state-specific claims,
- clearly distinguish educational guidance from official instructions.

The AI assistant should refuse prompts like:
- “Which party should I vote for?”
- “Who will win?”
- “Convince someone to vote for candidate X.”

Instead, it should reply with a neutral message and offer process-related help.

## Required screens and sections

Build the app with at least these pages or app views:

1. **Landing page**
- Hero section explaining the app purpose
- Role-based entry points
- Quick access cards for first-time voters, election timeline, polling day, counting, FAQ

2. **User role selection flow**
- First-time voter
- Registered voter
- Student / learner
- General citizen

3. **Personalized journey page**
- Generates a tailored checklist based on user answers
- Shows next steps and learning modules

4. **Election lifecycle page**
- Interactive visual timeline of the Indian election process

5. **Polling day simulator**
- Guided step-by-step immersive explainer

6. **Counting and results page**
- Conceptual explainer with simple diagrams/cards

7. **FAQ + AI assistant page**
- Suggested prompts
- grounded conversational UI

8. **Myth vs fact page**
- civic misinformation correction focused only on process

9. **About / transparency page**
- explains what the app can and cannot do
- clarifies that users should verify critical information from official sources

## UX and design direction

Use a refined, trustworthy, modern government-tech or civic-tech feel.

Design style:
- professional and calm,
- clean neutral palette with one restrained accent color,
- excellent mobile responsiveness,
- polished interactions,
- no flashy political colors or party symbolism,
- minimal clutter,
- accessible typography,
- strong content hierarchy.

The interface should feel suitable for students, first-time voters, and the general public.

## AI behavior requirements

The AI assistant inside the app should:
- answer in clear, simple language,
- support plain English and be architected for multilingual output,
- use retrieval-grounded election knowledge,
- maintain a neutral tone,
- provide procedural education only,
- redirect partisan or manipulative prompts,
- identify uncertainty when information may depend on the election type or state.

Use system prompting and application rules to enforce these constraints.

## Suggested data/content strategy

Structure content into domain modules such as:
- election_types,
- voter_registration,
- electoral_roll,
- polling_day,
- evm_vvpat,
- counting,
- results,
- myth_fact,
- glossary.

Each module should have:
- title,
- short explanation,
- detailed explanation,
- beginner explanation,
- FAQs,
- tags,
- related stages.

This should make retrieval and guided UI easier.

## Technical requirements

### Frontend
- Use Next.js App Router
- TypeScript
- Component-based architecture
- Responsive design
- Good loading states, empty states, and error states

### Backend / API
- API routes or backend endpoints for AI responses
- structured prompt layer for neutrality and scope control
- retrieval-ready content loading
- rate limiting placeholder or basic protection if practical

### AI integration
- Build the assistant so it can be connected to Gemini or another strong LLM
- Include a grounding strategy using internal knowledge files or structured data
- Enforce scope restrictions in backend prompt orchestration

### Deployment
- Containerize the app with Docker
- Make it deployable to Google Cloud Run
- Expose a clear `Dockerfile`
- If needed, include `cloudbuild.yaml`
- Ensure the app can run with environment variables for API keys and project settings

## Mandatory GitHub to Cloud Run auto-deploy requirement

Set up the project so it can be automatically built and deployed when code is pushed to GitHub.

Support one of these production-ready patterns:

### Option A: Cloud Run continuous deployment from GitHub repository
Use Google Cloud Run continuous deployment with Cloud Build trigger connected to GitHub so pushes to the main branch automatically build and deploy. This is a documented Cloud Run flow using Cloud Build triggers from a repository.[cite:29][cite:31]

### Option B: GitHub Actions deploying to Cloud Run
Alternatively, provide GitHub Actions workflow files using Google’s Cloud Run deploy action and modern authentication flow for automated deployment from GitHub to Cloud Run.[cite:30][cite:32][cite:39]

Preferred output: include both patterns if practical, but default to the simplest reliable production path.

## Repository output expectations

The generated project should include:
- complete app source code,
- `README.md` with setup and deployment instructions,
- `Dockerfile`,
- `.dockerignore`,
- environment variable example file,
- GitHub Actions workflow or `cloudbuild.yaml`,
- clear instructions for connecting GitHub and Google Cloud Run,
- clean folder structure,
- production-friendly defaults.

## README requirements

The project README should explain:
- what the app does,
- major features,
- how AI is used,
- how to run locally,
- how to configure environment variables,
- how to deploy to Cloud Run,
- how to enable automatic deployment from GitHub,
- what IAM or authentication setup is required if using GitHub Actions,
- what constraints and guardrails apply.

## Cloud Run deployment expectations

The app should be designed to run statelessly on Cloud Run. Cloud Run supports deployment from a Git repository and continuous deployment through Cloud Build triggers connected to a repository.[cite:29][cite:31][cite:38]

If GitHub Actions is used, prefer Google-supported actions and a secure authentication approach suitable for CI/CD to Cloud Run.[cite:30][cite:32]

## Non-functional quality bar

The app should be:
- demo-ready,
- polished enough for a hackathon final round,
- stable on mobile and desktop,
- easy to understand within 1 minute,
- cleanly structured for future scaling,
- suitable for civic-tech showcase use.

## Output instructions

Generate the full project.
Do not give only a prototype or wireframe.
Do not give only backend or only frontend.
Do not provide a toy chatbot.
Deliver a complete, deployable, production-style application.

Prioritize:
1. clean UX,
2. strong grounded AI behavior,
3. Indian election education relevance,
4. Cloud Run deployment readiness,
5. automatic GitHub-based CI/CD.

## Final implementation guidance

Use sensible defaults and make engineering decisions proactively.
Where a choice is unclear, choose the option that gives the best balance of:
- polished hackathon demo quality,
- deployment simplicity,
- maintainability,
- and trustworthiness.

The result should feel like a real civic-tech product that could be shown to judges, students, and public users.
