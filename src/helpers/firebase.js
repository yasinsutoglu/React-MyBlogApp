
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../features/AuthSlice";
import { errorBlogs, loadBlogs, readBlogs } from "../features/BlogSlice";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/toastNotify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: process.env.REACT_APP_databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);



//TODO - Register Function
export const userRegister = async(values,navigate) =>{

  const {firstName,lastName,email,password} = values;
  try {
    await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(auth.currentUser,{
      displayName : `${firstName} ${lastName}`,
    })

     navigate("/");
     toastSuccessNotify("Register Performed");
  } catch (error) {
    toastErrorNotify(error.message);
  }
}

//TODO - Login Function
export const userLogin = async(values,navigate) =>{

  const {email,password} = values;
  try {
    await signInWithEmailAndPassword (auth, email, password)    
     navigate("/");
     toastSuccessNotify("Login Performed");
  } catch (error) {
    toastErrorNotify(error.message)
  }
}

//TODO - userObserver Hook
export const useObserverHook = ()=>{

  const dispatch = useDispatch();

   const userObserver = () => {
     onAuthStateChanged(auth, (user) => {
       if (user) {
         const { email, displayName, photoURL } = user;
         dispatch(setUser({ email, displayName, photoURL }));
       } else {
         dispatch(clearUser());
       }
     });
   };

   return {userObserver}
}

//TODO - Logout Function
export const userLogout = ()=>{
  signOut(auth);
}


//TODO - Google Authentication
export const signWithGoogle = (navigate)=>{
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result)
        navigate("/");
        toastSuccessNotify("Login Performed");
    })
    .catch((error) => {
      console.log(error);
    });
}

//TODO - Forgot Password Function
export const forgotPassword = (email) => {
  
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};

////////////////! CRUD PROCESS START ///////////////////////////

//TODO - createBlog Function
export const createBlog = ({title,imgURL,content,date,creator,comments,likes})=>{
  const blogRef = ref(db, "blogs/")
  const newBlogRef = push(blogRef)

    set(newBlogRef,{
      title: title,
      imgURL:imgURL,
      content:content,
      date:date,
      creator:creator,
      comments:comments,
      likes:likes,
    })
    console.log("blog created");
}

//TODO - Read Blogs

export const useReadBlogs = ()=>{
  
  const dispatch = useDispatch()
   const { blogs, loading, error } = useSelector((state) => state?.blog);

  useEffect(() => {    
        dispatch(loadBlogs());

        const blogRef = ref(db, "blogs/");

        onValue(blogRef, (snapshot) => {
          const data = snapshot.val();
          const blogArray = [];

          for (let id in data) {
            blogArray.push({ id, ...data[id] });
          }

          if(blogArray.length > 0){
            dispatch(readBlogs(blogArray));
          }else{
             dispatch(errorBlogs());
             toastErrorNotify("Database Error!");
          }          
        });      
  }, [])
  
  return {blogs , loading , error}
}


//TODO - Delete Blog

export const deleteMyBlog = (id)=>{
  remove(ref(db, "blogs/" + id));
  toastSuccessNotify("Blog deleted successfully")
}

//TODO - Update Blog

export const updateMyBlog = (blog)=>{
  // const blogRef = ref(db, "blogs/");
  
  const updates = {};
  updates["blogs/" + blog.id] = blog;

  return update(ref(db),updates);
}