import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import serviceCatalogData from "../../data/ServiceList";
import { serviceCategories } from "../../data/ServiceCategory";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServiceCatalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryLocation = location.state?.category || "TELEVISION";
  const [selectedCategory, setSelectedCategory] = useState(categoryLocation);

  const selectedCategoryData = serviceCatalogData.find(
    (cat) => cat.name.toUpperCase() === selectedCategory
  );

  return (
    <div className="min-h-screen text-white pt-24 pb-20 px-4 md:px-12 relative z-50">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-orange-500 tracking-tight mb-10 text-center"
      >
        Service Catalog
      </motion.h1>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-14">
        {serviceCategories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`relative rounded-xl overflow-hidden shadow-md cursor-pointer h-36 sm:h-48 lg:h-52 transition-all duration-300 ${
              selectedCategory === category.name.toUpperCase()
                ? "ring-4 ring-orange-500 scale-[1.03]"
                : "hover:scale-[1.04]"
            }`}
            style={{ backgroundImage: `url(/img/${category.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
            onClick={() => setSelectedCategory(category.name.toUpperCase())}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 hover:from-black/90" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center px-2">
              <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg drop-shadow-md">
                {category.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Services Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-black/60 backdrop-blur-md p-5 sm:p-8 rounded-2xl shadow-xl border border-orange-600/60"
      >
        {selectedCategoryData ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-400 text-center">
                {selectedCategoryData.name} Services
              </h2>

              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-6 py-2 shadow-lg transition-all"
                onClick={() =>
                  navigate("/request-form", {
                    state: { selectedCategory: selectedCategory.toUpperCase() },
                  })
                }
              >
                SELECT CATEGORY
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-lg border border-orange-700/50">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-orange-600/20 text-orange-400 text-sm sm:text-base">
                    <th className="p-3 sm:p-4 border-b border-orange-700/70 w-[70%]">
                      Service Name
                    </th>
                    <th className="p-3 sm:p-4 border-b border-orange-700/70 text-right">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategoryData.services.map((service, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-orange-500/10 transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <td className="p-3 sm:p-4 border-b border-orange-700/50">
                        {service.name}
                      </td>
                      <td className="p-3 sm:p-4 border-b border-orange-700/50 text-right text-orange-300 font-medium">
                        {service.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 text-sm md:text-base py-10">
            Select a category above to view available services.
          </p>
        )}
      </motion.div>
    </div>
  );
}
