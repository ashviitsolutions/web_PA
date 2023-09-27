import React ,{useState , useEffect} from 'react'
import Hook from "../Hook/Hook"

function Setting() {
  const username = localStorage.getItem("username")
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Hook.getProfile();
        setPosts(response.data);
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setName(`${response.data.first_name} ${response.data.last_name}`)
        console.log("get setting", response.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);
  localStorage.setItem("username" ,`${posts.first_name} ${posts.last_name}`)
  localStorage.setItem("useremail" ,`${posts.email}`)
  // localStorage.setItem("username" ,`${posts.first_name} ${posts.last_name}`)
  console.log("get setting posts", posts.email);
  return (
    <div id='profile_page'>
      <div className='settings_form'>
        <div className='gutter'>
          <h3 className='profile_heading'>{username}</h3>
        </div>
        <div className='gutter'>
          <h3 className='small_heading'>Profile Setting</h3>
        </div>
        <div className='profile_info'>
          <div className='input_group'>
            <label htmlFor='' className='static'>Your Name</label>
            <input type='text' className='input' value={name} required onChange={(e)=>setName(e.target.value)} />
            <span className='highlight'></span>
          </div>
          <div className='input_group'>
            <label htmlFor='' className='static'>Your Email</label>
            <input type='email' value={email} className='input' required onChange={(e)=>setEmail(e.target.value)}  />
            <span className='highlight'></span>
          </div>
          <div className='input_group'>
            <label htmlFor='' className='static'>Your Contact Number</label>
            <input type='number'  value={phone} className='input' required onChange={(e)=>setPhone(e.target.value)} />
            <span className='highlight'></span>
          </div>

          <div className='input_group'>
            <button className='button small'>Update</button>
          </div>

          <div className='float_wrapper'>
            <label className='static'>Change password</label>
            <button className='update_button'>Edit</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Setting