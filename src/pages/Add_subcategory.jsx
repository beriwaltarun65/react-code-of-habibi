


import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useParams, Link } from "react-router-dom";

// function Subcategory(){
//     const [subcat_name, setSubCat_name] = useState('')
//     const [subcat_image, setSubCatImage] = useState('')
//     const { id } = useParams(); 
//     const navigate = useNavigate()

   

//     const handleSubmit = async (e)=>{
//         e.preventDefault()

//         const formData = new FormData()
//         formData.append('name',subcat_name )
//         formData.append('image', subcat_image)
//         formData.append('category', id); 

//         const token = localStorage.getItem('access_token')

//         if(!token){
//             alert("Please login first.")
//         }
        

//         const response = await fetch(`http://127.0.0.1:8000/api/subcategory/`,{
//             method : 'POST',
//             headers : {
//                 'Authorization': `Bearer ${token}`
//             },
            
//             body : formData

//         })

//         if (response.ok){
//             navigate("/")
//             setSubCat_name('');
//             setSubCatImage(null);
//         }else {
//             const errorData = await response.json();
//             console.error(errorData);
//             alert('Failed to create category.');
//         }   
          

//     }

//     return(
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
           
//            <h2>Create subcategory</h2>
//            <label>SubCategory Name</label>
//             <input
//                 type="text"
//                 value={subcat_name}
//                 onChange={(e) => setSubCat_name(e.target.value)}
//             />

//             <label>Upload Image:</label>
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setSubCatImage(e.target.files[0])}
//             />

//             <button type="submit">Add Category</button>


//         </form>
//     )

    
// }

// export default Subcategory


function Subcategory() {
  const [subcat_name, setSubCat_name] = useState('');
  const [subcat_image, setSubCatImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing subcategory data if id exists
  useEffect(() => {
    if (id) {
      const fetchSubcategory = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
          alert('Please login first.');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/subcategory/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubCat_name(data.name);
          setSubCatImage(data.image);
        } else {
          alert('Failed to fetch subcategory data.');
        }
      };

      fetchSubcategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', subcat_name);
    if (subcat_image) formData.append('image', subcat_image);
    formData.append('category', id);

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login first.');
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://127.0.0.1:8000/api/subcategory/${id}/`
      : 'http://127.0.0.1:8000/api/subcategory/';

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      navigate('/');
      setSubCat_name('');
      setSubCatImage(null);
    } else {
      const errorData = await response.json();
      console.error(errorData);
      alert('Failed to save subcategory.');
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login first.');
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/api/subcategory/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      navigate('/');
    } else {
      alert('Failed to delete subcategory.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>{id ? 'Edit' : 'Create'} Subcategory</h2>
      <label>Subcategory Name</label>
      <input
        type="text"
        value={subcat_name}
        onChange={(e) => setSubCat_name(e.target.value)}
      />

      <label>Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSubCatImage(e.target.files[0])}
      />

      <button type="submit">{id ? 'Update' : 'Add'} Subcategory</button>

      {id && (
        <button type="button" onClick={handleDelete}>
          Delete Subcategory
        </button>
      )}
    </form>
  );
}

export default Subcategory;