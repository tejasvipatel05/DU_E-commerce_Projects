import { useEffect, useState } from "react";
import '../custom.css';
import { Link } from "react-router-dom";

function GetAllCategory() {
    const apiURL = 'http://localhost:1005/category';
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch(apiURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(res => setData(res))
    }, [])

    // const handleCategoryClick = (categoryId) => {
    //     navigate(`/category/${categoryId}`); // Navigate to category page
    // };

    const formatedData = data.map((d) => {
        return (
            <Link
                to={"/product/"+d._id}
                className="nav-link swiper-slide text-center"
                style={{ cursor: "pointer" }}
            >
                <img
                    src={d.category_img}
                    className="rounded-circle"
                    style={{ 'height': '15rem', 'width': '15rem' }}
                    alt="Category Thumbnail" />
                <h4 className="fs-6 mt-3 fw-normal category-title">{d.category_name}</h4>
            </Link>
        );
    })

    return (
        <>
            {formatedData}
        </>
    )
}

export default GetAllCategory;