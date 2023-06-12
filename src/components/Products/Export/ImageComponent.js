import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
    const [exportProducts, setExportProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getExportProducts();
    }, []);

    const getExportProducts = async () => {
        try {
            const apiExportProducts = await axios.get("http://localhost:8000/api/img");
            setExportProducts(apiExportProducts.data);
            setIsLoading(false);
            console.log(apiExportProducts.data);
        } catch (error) {
            console.error("Error fetching export products:", error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {exportProducts.map((item) => (
                        <div key={item.id}>
                            <img src={item.URL} alt="image" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageComponent;
