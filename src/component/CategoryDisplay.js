import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Style/Homepage.css";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory} from 'react-router-dom';

function CategoryDisplay() {

    const [state, setState] = useState({ category: [], carousel: [], currentImage: 0 });
    
    axios.defaults.baseURL = 'http://localhost:8081/e-shop';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(() => {
        axios.get("/getInitialData").then(resp => {
            if (resp.data.statusCode === "200") {
                setState({
                    currentImage: 0,
                    category: resp.data.categoryList,
                    carousel: resp.data.carouselList
                });
            }
        })

    }, []);

    const loadNext = () => {
        if (currentImage === carousel.length - 1)
            setState({ ...state, currentImage: 0 });
        else
            setState({ ...state, currentImage: currentImage + 1 });
    };

    const loadPrevious = () => {
        if (currentImage === 0)
            setState({ ...state, currentImage: carousel.length - 1 });
        else
            setState({ ...state, currentImage: currentImage - 1 });
    };

    const openCategory = () => {
        history.push('/search');
    }
    const history = useHistory();

    const { category, carousel, currentImage } = state;
    return (
        <div>
            <div className="sub-header-container">
                <div className="all-cateogry-selector" >
                    <MenuIcon /> All
                </div>
                {Array.isArray(category) ? category.map(data =>
                    <div key={data.categoryId} onClick={() => openCategory()} className="category-subheader">{data.name} </div>
                ) : <div />}
                <div>Shopping Made Easy With us</div>
            </div>

            {/* working carousel commented for future reference - handled via image src updation*/}
            {carousel.length > 0 ?
                <div className="slideshow">
                    <div className="slide-back-icon-container" onClick={() => loadPrevious()}><ArrowBackIosIcon style={{ fontSize: 40 }} /></div>
                    <img key={carousel[currentImage].carouselId} className="slide-image" src={carousel[currentImage].carouselImageUrl} alt={carousel[currentImage].carouselId} />
                    <div className="slide-front-icon-container" onClick={() => loadNext()}><ArrowForwardIosIcon style={{ fontSize: 40 }} /></div>
                </div> : <div />}

            {/* {carousel.length > 0 ?
                <div className="slideshow">
                    <div className="slide-back-icon-container" onClick={() => Previous()}><ArrowBackIosIcon style={{ fontSize: 40 }} /></div>
                    <ol style={{ width: "10500px", transform: "translateX(-4500px) translateZ(0px)" }}>
                        {Array.isArray(carousel) ? carousel.map((carouselData, currentImage) => {
                            return (<li key={carouselData.carouselId} className={carouselData.carouselId === currentImage ? "carousel-image-show" : "carousel-image-hide"}>
                                <img
                                    key={carouselData.carouselId}
                                    className="slide-image"
                                    src={carouselData.carouselImageUrl}
                                    alt={carouselData.carouselId}
                                />
                            </li>);

                        }) : <li />}
                    </ol>
                    <div className="slide-front-icon-container" onClick={() => Next()}><ArrowForwardIosIcon style={{ fontSize: 40 }} /></div>
                </div> : <div />} */}


            {/* <div className="category-container">
                {Array.isArray(category) ? category.map(data =>
                    <CategoryCards key={data.categoryId} Groups={data} />
                ) : <div />}
            </div> */}

        </div>
    );
};

export default CategoryDisplay;