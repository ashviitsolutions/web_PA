import React, { useState, useEffect } from 'react'
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import sampleImg from '../../assets/img/FAQ.jpg'

function Blog() {

  let params = useParams();
  let { id } = params;
  const [blogId, setId] = useState(id);
  const [users, setUsers] = useState([]);
  const [Recent, setRecnet] = useState([]);
  const [imagerecent, setImagerecent] = useState();
  const [image, setImage] = useState();
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${IP}/blog/blogs/${blogId}`);
        const data = await res.json();
        setUsers(data);
        setImage(data[0].attachments)
        console.log("get post data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [blogId]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${IP}/blog/blogs`);
        const data = await res.json();
        setRecnet(data.slice(0, 5));
        setImagerecent(data.attachments)
        console.log("get post data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const getUniqueTimelineData = () => {
    const timelineData = [];

    Recent.forEach((post) => {
      const postDate = new Date(post.createdAt); // Assuming there's a 'createdAt' property in each post
      const year = postDate.getFullYear();
      const month = postDate.getMonth() + 1; // Adding 1 since months are zero-based

      // Check if the year already exists in the timeline
      const yearIndex = timelineData.findIndex((item) => item.year === year);

      if (yearIndex === -1) {
        // If the year doesn't exist, add it to the timeline
        timelineData.push({
          year,
          months: [month],
        });
      } else if (!timelineData[yearIndex].months.includes(month)) {
        // If the month is not already in the list, add it
        timelineData[yearIndex].months.push(month);
      }
    });

    return timelineData;
  };

  const timelineData = getUniqueTimelineData();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleMonthClick = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month < 10 ? `0${month}` : `${month}`);
    // You can use the selectedYear and selectedMonth values as needed
  };

  console.log("year", selectedYear)
  console.log("selectedMonth", selectedMonth)








  console.log("Recent post data", Recent);
  const handleReadMoreClick = (index) => {
    setActiveCardIndex(index);
  };

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };



  return (
    <>
      <div className='blogPage'>
        <div className='details_blog row'>
          <div id="blogPost" className='blogPost col-sm-8'>


            <div className="">
              <div className="blog_wrapper">
                <div className="blogContent">

                  <div
                    id='detailimage'
                    className="bg blogImage"
                    style={{
                      backgroundImage: `url(${`http://45.13.132.197:5000/api/file/${users.attachments}`})`,
                      borderRadius: '7px',
                    }}
                  ></div>


                  <div className="content blogContent" id='detailblogitem'>
                    <h3 >{users.title}</h3>
                    { /*<p dangerouslySetInnerHTML={{ __html: user.description }} />  */}
                    <p

                      dangerouslySetInnerHTML={createMarkup(users.description)}
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>






          <div className='col-sm-4 blogSidebar'>
            <div className='sideBlogs'>
              <h3 className='smallHeading'>Recent Posts</h3>
              {Recent.map((post, index) => (
                <div key={index} className='sideBox row' onClick={() => setId(post._id)}>
                  {/* Assuming each post has an 'attachments' property */}
                  <div className='sideImg col-sm-3'>
                    {/* Assuming you want to display an image for each post */}
                    <img src={`http://45.13.132.197:5000/api/file/${post.attachments}`} alt={`Sample ${index + 1}`} />
                  </div>
                  <div className='sideContent col-sm-9'>
                    <h3>{post.title}</h3>
                    <p dangerouslySetInnerHTML={{
                      __html: index === activeCardIndex
                        ? post.description
                        : post.description.slice(0, 60) + (post.description.length > 60 ? "..." : "")
                    }} />
                  </div>
                </div>
              ))}


              <div className='timeline'>
                <h3 className='smallHeading mt-5'>Timeline</h3>
                <ul className='timeline_year'>
                  {timelineData.map((timelineItem, index) => (
                    <li key={index}>
                      {timelineItem.year}
                      <ul className='timeline_month'>
                        {timelineItem.months.map((month, monthIndex) => (
                          <li key={monthIndex} onClick={() => handleMonthClick(timelineItem.year, month)}>
                            {month < 10 ? `0${month}` : `${month}`}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>








        </div>
      </div>

    </>
  )
}

export default Blog