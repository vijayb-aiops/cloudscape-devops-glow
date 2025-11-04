import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import projectEks from "@/assets/project-eks.jpg";
import projectIam from "@/assets/project-iam.jpg";
import projectDynatrace from "@/assets/project-dynatrace.jpg";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "EKS CI/CD with Helm and Jenkins",
      description:
        "Automated build → deploy → monitor pipeline with zero downtime. Integrated Jenkins with Kubernetes for seamless deployments, achieving 20% increase in system uptime.",
      image: projectEks,
      tech: ["Kubernetes", "Jenkins", "Helm", "AWS EKS", "Docker"],
      githubLink: "#",
    },
    {
      title: "AWS IAM Key Rotation Automation",
      description:
        "Built Boto3 + Lambda solution for secure IAM key lifecycle management. Reduced manual provisioning effort by 70% while enhancing security compliance.",
      image: projectIam,
      tech: ["Python", "AWS Lambda", "Boto3", "IAM", "CloudWatch"],
      githubLink: "#",
    },
    {
      title: "Azure App Monitoring with Dynatrace",
      description:
        "Unified observability across hybrid environments. Automated Dynatrace agent installation, cutting setup time by 90% in dev/test environments.",
      image: projectDynatrace,
      tech: ["Dynatrace", "Azure", "Monitoring", "Automation", "PowerShell"],
      githubLink: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-glow">
            Featured Projects
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Real-world DevOps solutions delivering measurable impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all shadow-lg"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/30 hover:bg-primary hover:text-primary-foreground group/btn"
                      asChild
                    >
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
