# Krisantha Sarma - Portfolio Website

A modern, professional portfolio website built with cutting-edge web technologies.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **UI Components:** Custom components with Shadcn/ui patterns
- **Theme:** Dark/Light mode with smooth transitions

## ✨ Features

- 🎨 Modern, gradient-based design with smooth animations
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive across all devices
- ⚡ Optimized performance with Next.js 15
- 🎭 Smooth scroll animations and page transitions
- 🎯 SEO optimized with meta tags
- ♿ Accessible UI components
- 🎪 Interactive timeline for experience
- 💼 Project showcase with technology highlights
- 📧 Contact form with mailto integration

## 🏗️ Project Structure

```
Portfolio/
├── app/
│   ├── fonts/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   └── theme-provider.tsx
├── data/
│   └── portfolio.ts
├── lib/
│   └── utils.ts
└── public/
    ├── images/
    └── icons/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Krisantha-VS/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Update Personal Information

Edit the data in `data/portfolio.ts` to customize:
- Personal information (name, email, phone, location)
- Work experience
- Education
- Skills
- Projects
- Social links

### Modify Theme Colors

Update the color variables in `app/globals.css` under the `:root` and `.dark` selectors.

### Add New Sections

Create new section components in `components/sections/` and import them in `app/page.tsx`.

## 🚢 Deployment

This portfolio can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the `.next` folder
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Krisantha Sarma**
- Email: krisantha.sarma@gmail.com
- GitHub: [@Krisantha-VS](https://github.com/Krisantha-VS)
- LinkedIn: [@krisantha-sarma](https://linkedin.com/in/krisantha-sarma)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
