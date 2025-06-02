
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";




const Subcategory = () => {
    const { id } = useParams(); 
    const [subcategories, setSubcategories] = useState([]);  

    const getsubcategory = async () => {
      let url = `http://127.0.0.1:8000/api/subcategory_by_category/${id}/`;
      // let url = `http://127.0.0.1:8000/api/subcategory_by_category/${id}/`; 

      try {
        const response = await fetch(url);
        const data = await response.json();
        setSubcategories(data); 
      } catch (error) {
        
      }
    };

    useEffect(() => {
      getsubcategory();
    }, []); 

    return (
      <>

          <div style={{ marginBottom: "20px" }}>
              <Link to={`/create-Sub-cat/${id}`}>
                  <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                      Add Subcategory 
                  </button>
              </Link>
          </div>
        
          <div className="category-container">  
            {subcategories.map((subcategory, index) => (
              <div key={subcategory.id || index} className="category-item">  
                <Link to={`/Product/${subcategory.id}`}>
                  <h2>{subcategory.name}</h2>
                </Link>
                {subcategory.image && (
                  <img 
                    src={`http://127.0.1:8000${subcategory.image}`}
                    // src={subcategory.image} 
                    alt={subcategory.name}
                    style={{ width: '300px', height: 'auto' }}  
                  />
                )}
              </div>
            ))}
          </div>
     
      </>
    );
};

export default Subcategory;
