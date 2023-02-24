import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image1 from "../../assets/img/6099962.jpg"
import Image2 from "../../assets/img/6212029.jpg"
import Image3 from "../../assets/img/Wavy_B&F-01_Single-03.jpg"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};
function Slider() {
  return (
    <>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1500}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={100}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        slidesToSlide={1} // set to 1 to slide only one image at a time
      >
        <div id="profile_wizard_carousel" className="owl-carousel owl-theme">
          <div className="item">
            <span className="illustration" style={{ backgroundImage: `url(${Image1})` }}></span>
            <div className="content">
              <h3>title goes here..</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
            </div>
          </div>
        </div>
        <div id="profile_wizard_carousel" className="owl-carousel owl-theme">
        <div className="item">
          <span className="illustration" style={{ backgroundImage: `url(${Image2})` }}></span>
          <div className="content">
            <h3>title goes here..</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </div>
      <div id="profile_wizard_carousel" className="owl-carousel owl-theme">
      <div className="item">
        <span className="illustration" style={{ backgroundImage: `url(${Image3})` }}></span>
        <div className="content">
          <h3>title goes here..</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
        </div>
      </div>
    </div>
      </Carousel>
    </>
  )
}

export default Slider;
