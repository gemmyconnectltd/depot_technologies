import {
  Code2,
  ShieldCheck,
  Cloud,
  BarChart2,
  Users,
  Layers,
} from "lucide-react";

export const SOFTWARE_PRODUCTS = [
  {
    name: "Software Licenses",
    description:
      "Genuine licenses for productivity, "
      + "design and development tools.",
    icon: Code2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tags: ["Microsoft", "Adobe", "Autodesk"],
    image:
      "https://images.unsplash.com/photo-1555066931"
      + "-4365d14bab8c?w=600&q=80",
    imageAlt: "Software code on screen",
  },
  {
    name: "Security Software",
    description:
      "Antivirus, endpoint protection and "
      + "firewall solutions for your team.",
    icon: ShieldCheck,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tags: ["Antivirus", "Endpoint", "Firewall"],
    image:
      "https://images.unsplash.com/photo-1510511459019"
      + "-5dda7724fd87?w=600&q=80",
    imageAlt: "Cybersecurity and protection",
  },
  {
    name: "Cloud Subscriptions",
    description:
      "SaaS platforms and cloud services "
      + "billed monthly or annually.",
    icon: Cloud,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tags: ["AWS", "Azure", "Google Cloud"],
    image:
      "https://images.unsplash.com/photo-1544197150"
      + "-58ab2b40e712?w=600&q=80",
    imageAlt: "Cloud computing infrastructure",
  },
  {
    name: "Analytics & BI Tools",
    description:
      "Data visualization and reporting "
      + "platforms for informed decisions.",
    icon: BarChart2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tags: ["Power BI", "Tableau", "Looker"],
    image:
      "https://images.unsplash.com/photo-1551288049"
      + "-bebda4e38f71?w=600&q=80",
    imageAlt: "Data analytics dashboard",
  },
  {
    name: "Collaboration Tools",
    description:
      "Team communication and project "
      + "management software at scale.",
    icon: Users,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tags: ["Slack", "Notion", "Jira"],
    image:
      "https://images.unsplash.com/photo-1600880292203"
      + "-757bb62b4baf?w=600&q=80",
    imageAlt: "Team collaboration",
  },
  {
    name: "Development Platforms",
    description:
      "IDEs, CI/CD tools and developer "
      + "platforms for engineering teams.",
    icon: Layers,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tags: ["GitHub", "JetBrains", "Docker"],
    image:
      "https://images.unsplash.com/photo-1607706189992"
      + "-d4c6de2a2c2e?w=600&q=80",
    imageAlt: "Developer tools and platforms",
  },
];
