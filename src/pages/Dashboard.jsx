// import { useSelector } from 'react-redux'
import BlogCard from '../components/BlogCard'
import { useReadBlogs } from '../helpers/firebase'
import loadgif from "../assets/imgs/load.gif";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';



const Dashboard = () => { 

  const {blogs, loading,  error} = useReadBlogs()
  const {search} = useSelector(state => state?.blog)  

const filteredBlogs = useMemo(()=>{
    return blogs?.filter((item)=> item.title.toLowerCase().includes(search?.toLowerCase())) 
  },[blogs,search])

     
  
if(loading && !error){
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
      <img src={loadgif} alt="gif"/>
    </div>    
  ) 
}else if(!loading && !error){
  return (
    <div className="container d-flex justify-content-center gap-5 flex-wrap mt-2 py-4">
      {filteredBlogs?.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      })}
    </div>
  );
}else{
  return (
    <div>
      <img src="https://fixmysite.com/site/wp-content/uploads/2019/04/database-error.jpg" alt="img" style={{width:"100%", height:"100%"}} />
    </div>
  );
}

}

export default Dashboard