import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Cloud, Code, Lock } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = [
    { name: "AWS Solutions Architect", icon: Cloud },
    { name: "Azure Administrator", icon: Cloud },
    { name: "DevOps Engineer Expert", icon: Code },
    { name: "Dynatrace Associate", icon: Award },
  ];

  return (
    <section id="about" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-glow">
            About Me
          </h2>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border card-glow">
            <motion.p
              className="text-lg md:text-xl text-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              A <span className="text-primary font-semibold">results-driven DevOps Engineer</span> passionate
              about automation, cloud scalability, and operational excellence.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              With <span className="text-primary font-semibold">5+ years</span> of hands-on experience, I specialize in
              building end-to-end DevOps solutions across healthcare, consulting, and technology sectors. My expertise
              spans AWS, Azure, Terraform, Jenkins, Kubernetes, Helm, Python, GitHub Actions, Ansible, Prometheus, and
              Grafana.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={cert.name}
                    className="flex flex-col items-center p-4 bg-background/50 rounded-lg border border-primary/20 hover:border-primary transition-all"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <p className="text-sm text-center text-foreground">{cert.name}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="bg-primary/10 border border-primary/30 rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-primary">
                    Security & Compliance Focus
                  </h3>
                  <p className="text-muted-foreground">
                    Implemented secure, compliant environments with automated security scanning (SonarQube, Fortify,
                    GitHub Advanced Security), IAM policy enforcement, and secrets management — reducing unauthorized
                    access incidents by 40%.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
