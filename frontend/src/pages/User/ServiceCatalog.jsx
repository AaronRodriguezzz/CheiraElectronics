import React, { useEffect, useState } from "react";
import serviceCatalogData from "../../data/ServiceList";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ServiceCatalog() {
    const navigate = useNavigate();
    const location = useLocation();
    const categoryLocation = location.state?.category || 'TELEVISION';
    const [selectedCategory, setSelectedCategory] = useState(categoryLocation);

    console.log(selectedCategory);

    return (
        <div className="min-h-screen  text-white pt-28 pb-16 px-4 md:px-12 relative z-50">
        {/* Page Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-orange-500 tracking-tighter mb-10 text-center">
            Service Catalog
        </h1>

        {/* Categories List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
            {serviceCatalogData.map((category, index) => (
            <button
                key={index}
                onClick={() =>
                    setSelectedCategory(category.name.toUpperCase())
                }
                className={`border-2 border-orange-500 rounded-lg py-3 px-2 font-medium text-sm md:text-base transition-all duration-300 ${
                selectedCategory === category.name.toUpperCase()
                    ? "bg-orange-500 text-black shadow-lg"
                    : "bg-transparent text-orange-400 hover:bg-orange-500 hover:text-black hover:shadow-md"
                }`}
            >
                {category.name}
            </button>
            ))}
        </div>

        {/* Services Section */}
        <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg border border-orange-500/70">
            {selectedCategory ? (
            <>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-orange-400 text-center space-x-2">
                        <span>
                            {selectedCategory.charAt(0).toUpperCase()}
                            {selectedCategory.slice(1).toLowerCase()}
                        </span> 
                        <span>Services</span>
                    </h2>

                    <button 
                        className="bg-orange-500 rounded-lg px-4 py-2 hover:bg-orange-700 transition"
                        onClick={() => navigate('/request-form', { state: { selectedCategory: selectedCategory.toUpperCase() } })}
                    >
                        SELECT CATEGORY
                    </button>
                </div>
                

                <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse border border-orange-700">
                    <thead>
                    <tr className="bg-orange-600/20 text-orange-400">
                        <th className="p-3 border border-orange-700 w-[70%]">
                            Service Name
                        </th>
                        <th className="p-3 border border-orange-700 text-right">
                            Price
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {serviceCatalogData
                        .find((cat) => cat.name.toUpperCase() === selectedCategory)
                        ?.services.map((service, idx) => (
                        <tr
                            key={idx}
                            className="hover:bg-orange-500/10 transition-colors"
                        >
                            <td className="p-3 border border-orange-700 text-sm md:text-base">
                            {service.name}
                            </td>
                            <td className="p-3 border border-orange-700 text-sm md:text-base text-orange-300 text-right">
                            {service.price}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </>
            ) : (
            <p className="text-center text-gray-400 text-sm md:text-base">
                Select a category above to view available services.
            </p>
            )}
        </div>
        </div>
    );
}
