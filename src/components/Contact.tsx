import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "bvijaycloud@gmail.com",
      link: "mailto:bvijaycloud@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (647) 247-6435",
      link: "tel:+16472476435",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Toronto, ON, Canada",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "https://linkedin.com/in/vijayab",
      color: "hover:text-secondary",
    },
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/vijayab",
      color: "hover:text-primary",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-glow">
            Let's Connect
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Open to DevOps opportunities and collaborations
          </p>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-8 md:p-12 border border-primary/30 card-glow shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg hover:bg-background transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <p className="text-lg text-foreground mb-6">
                  Interested in working together? Let's build something amazing!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50"
                    asChild
                  >
                    <a href="mailto:bvijaycloud@gmail.com">
                      <Mail className="mr-2" size={20} />
                      Send Email
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href="https://linkedin.com/in/vijayab" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2" size={20} />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>

                <div className="flex justify-center gap-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-muted-foreground ${social.color} transition-colors`}
                        whileHover={{ scale: 1.2, y: -5 }}
                        aria-label={social.label}
                      >
                        <Icon size={32} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="text-center mt-16 pt-8 border-t border-border"
      >
        <p className="text-muted-foreground">
          © 2024 Vijaya B. Crafted with passion for DevOps excellence.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
