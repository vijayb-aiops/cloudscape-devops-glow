import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cloud,
  Server,
  Container,
  Lock,
  Activity,
  Code,
  GitBranch,
  Settings,
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: Cloud,
      color: "text-primary",
      skills: ["AWS (EC2, S3, RDS, Lambda, IAM, VPC)", "Azure (AKS, App Services, Key Vault)"],
    },
    {
      title: "CI/CD & Automation",
      icon: GitBranch,
      color: "text-secondary",
      skills: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps", "Bitbucket Pipelines"],
    },
    {
      title: "Infrastructure as Code",
      icon: Settings,
      color: "text-accent",
      skills: ["Terraform", "CloudFormation", "Ansible", "ARM Templates", "Ansible Tower"],
    },
    {
      title: "Containers & Orchestration",
      icon: Container,
      color: "text-primary",
      skills: ["Docker", "Kubernetes", "Helm", "Rancher", "EKS", "AKS"],
    },
    {
      title: "Security Tools",
      icon: Lock,
      color: "text-secondary",
      skills: ["Vault", "IAM", "GitHub Advanced Security", "SonarQube", "Fortify"],
    },
    {
      title: "Monitoring & Observability",
      icon: Activity,
      color: "text-accent",
      skills: ["Prometheus", "Grafana", "Dynatrace", "CloudWatch", "ELK Stack"],
    },
    {
      title: "Scripting & Programming",
      icon: Code,
      color: "text-primary",
      skills: ["Python (Boto3)", "Bash", "PowerShell", "YAML"],
    },
    {
      title: "Servers & OS",
      icon: Server,
      color: "text-secondary",
      skills: ["Linux", "Windows Server", "RHEL", "Ubuntu"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-card/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-glow">
            Technical Skills
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Comprehensive DevOps expertise across cloud, automation, and security
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all group cursor-pointer shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${category.color} group-hover:animate-glow`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="font-display font-semibold text-lg">{category.title}</h3>
                  </div>

                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
