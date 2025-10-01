// Animation helper component
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

 const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.section>
    );
};

export default AnimatedSection

