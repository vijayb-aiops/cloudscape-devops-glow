import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: "PointClickCare",
      role: "DevOps Engineer",
      period: "2023 – Present",
      location: "Toronto, ON",
      highlights: [
        "Led CI/CD & Kubernetes automation for healthcare SaaS platform",
        "Reduced deployment times by 40% through Terraform and Helm optimization",
        "Implemented GitHub Advanced Security scanning across 50+ repositories",
        "Automated monitoring with Prometheus and Grafana, reducing incident detection by 60%",
      ],
    },
    {
      company: "Deloitte",
      role: "DevOps Consultant",
      period: "2022 – 2023",
      location: "Toronto, ON",
      highlights: [
        "Designed multi-cloud automation workflows across AWS and Azure",
        "Built secure deployment pipelines with SonarQube and Fortify integration",
        "Automated ServiceNow API workflows for IT operations",
        "Led cross-functional teams across Canada and Poland",
      ],
    },
    {
      company: "Roche",
      role: "DevOps Engineer",
      period: "2022",
      location: "Mississauga, ON",
      highlights: [
        "Modernized GitLab CI/CD pipelines for pharmaceutical applications",
        "Managed Kubernetes clusters with Rancher for zero-downtime releases",
        "Implemented infrastructure as code using Terraform and Ansible",
        "Supported global development teams with deployment automation",
      ],
    },
    {
      company: "BLS International",
      role: "IT Operations Specialist",
      period: "2020 – 2022",
      location: "Ottawa, ON",
      highlights: [
        "Maintained 99.9% uptime for biometric and visa processing platforms",
        "Automated incident response and database encryption workflows",
        "Reduced operational tickets by 40% through proactive monitoring",
        "Managed multi-region IT operations and project coordination",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-card/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-glow">
            Professional Experience
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            5+ years building DevOps excellence across leading organizations
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background animate-glow z-10" />

                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all shadow-lg"
                    >
                      <div className="flex items-center gap-2 mb-2 justify-start md:justify-end">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-display font-semibold text-primary">
                          {exp.company}
                        </h3>
                      </div>

                      <h4 className="text-lg font-semibold mb-2 text-foreground">{exp.role}</h4>

                      <div className="flex items-center gap-2 text-muted-foreground mb-4 justify-start md:justify-end">
                        <Calendar size={16} />
                        <span className="text-sm">{exp.period}</span>
                        <span className="text-sm">• {exp.location}</span>
                      </div>

                      <ul className="space-y-2 text-left">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1 flex-shrink-0">▸</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <div className="w-full md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
