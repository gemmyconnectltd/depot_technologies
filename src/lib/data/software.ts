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
    iconColor: "text-software",
    iconBg: "bg-software-light",
    tags: ["Microsoft", "Adobe", "Autodesk"],
    image:
      "https://images.unsplash.com/photo-1461749280684"
      + "-1bb17baa3a72?w=700&q=85",
    imageAlt: "Software code on screen",
  },
  {
    name: "Security Software",
    description:
      "Antivirus, endpoint protection and "
      + "firewall solutions for your team.",
    icon: ShieldCheck,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    tags: ["Antivirus", "Endpoint", "Firewall"],
    image:
      "https://images.unsplash.com/photo-1550751827"
      + "-4a913d1e3ea6?w=700&q=85",
    imageAlt: "Cybersecurity protection concept",
  },
  {
    name: "Cloud Subscriptions",
    description:
      "SaaS platforms and cloud services "
      + "billed monthly or annually.",
    icon: Cloud,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    tags: ["AWS", "Azure", "Google Cloud"],
    image:
      "https://images.unsplash.com/photo-1451187580459"
      + "-43490279c0fa?w=700&q=85",
    imageAlt: "Cloud computing infrastructure",
  },
  {
    name: "Analytics & BI Tools",
    description:
      "Data visualization and reporting "
      + "platforms for informed decisions.",
    icon: BarChart2,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    tags: ["Power BI", "Tableau", "Looker"],
    image:
      "https://images.unsplash.com/photo-1460925895917"
      + "-afdab827c52f?w=700&q=85",
    imageAlt: "Analytics and data dashboard",
  },
  {
    name: "Collaboration Tools",
    description:
      "Team communication and project "
      + "management software at scale.",
    icon: Users,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    tags: ["Slack", "Notion", "Jira"],
    image:
      "https://images.unsplash.com/photo-1522071820081"
      + "-0db04f42e0e4?w=700&q=85",
    imageAlt: "Team collaborating in an office",
  },
  {
    name: "Development Platforms",
    description:
      "IDEs, CI/CD tools and developer "
      + "platforms for engineering teams.",
    icon: Layers,
    iconColor: "text-software",
    iconBg: "bg-software-light",
    tags: ["GitHub", "JetBrains", "Docker"],
    image:
      "https://images.unsplash.com/photo-1504868584819"
      + "-a8de1b85fe11?w=700&q=85",
    imageAlt: "Developer tools and code editor",
  },
];
