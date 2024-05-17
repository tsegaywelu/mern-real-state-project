import { useSelector } from 'react-redux';
import { useEffect, useRef,useState } from 'react';
import { getDownloadURL, getStorage ,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../Firebase';
import {   updateuserstart, updateusersuccess, updateuserfailure} from '../redux/user/user.slice';
import { useDispatch } from 'react-redux';

//later on github i will use this 
// allow read;
//      allow write : if 
//       request.resource.size < 2*1024*1024 &&
//       request.resource.contentType.matches('image/.*');  from firbase storage 

const Profile = () => {
  const dispatch=useDispatch()

  const fileRef=useRef(null)

    const { currentuser } = useSelector((state) => state.user);
  const [file,setfile]=useState(undefined)
  const [filepersent,setfilepercent]=useState(0)
  const [formdata,setformdata]=useState({})
  const [fileuploaderror,setfileuploaderror]=useState(false);
  //console.log(file);

//  console.log(filepersent);
 //console.log(formdata);
//  console.log(fileuploaderror);


 useEffect(() => {
  if(file){
    handleFileUpload(file)
  }
  
}, [file])
const handleFileUpload=(file)=>{  //this works with firbase storage 
  const storage=getStorage(app);
  const fileName=new Date().getTime()+file.name;//to make it unique name i add the date 
  const storageRef=ref(storage,fileName)
  const uploadtask=uploadBytesResumable(storageRef,file)
  uploadtask.on('state_changed',
    (snapshot)=>{
      const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
   //console.log(progress);
   setfilepercent(Math.round(progress))
    },
    (error)=>{// This 'error' parameter is scoped to this callback function. no conflict out side of this function 
      //this is not decleared and warnning  omit it no problem 
      setfileuploaderror(true)
    },
    ()=>{
      getDownloadURL(uploadtask.snapshot.ref).then((downloadURL)=>{
        setformdata({...formdata,avatar:downloadURL})
      });
    }
  )
}

    


    const handlechange = (e) => {
      setformdata({ ...formdata, [e.target.id]: e.target.value });
      
    }



    // iam sending to the back-end here 
    const handlesubmit= async(e)=>{
      e.preventDefault();
     try{
      dispatch(updateuserstart())
      const response = await fetch(`http://localhost:3000/api/user/update/${currentuser._id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formdata),
});


      const data=await response.json()
      if(data.success===false){
        dispatch(updateuserfailure(data.message))
        return;
      }
     dispatch(updateusersuccess(data.user))

     }
     catch(error){
      updateuserfailure(error.message)

     }
    }
    //console.log(file);
  return (
 

<div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
        <input type='file' placeholder='upload your image ' ref={fileRef} hidden accept='image/*'
        onChange={(e)=>setfile(e.target.files[0])}
        />
       
        <img   
          src={formdata.avatar || currentuser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          onClick={()=>fileRef.current.click()}
          onChange={handlechange}
        />
        <span className='self-center text-sm '>
        {fileuploaderror ? (
          <p className='text-red-700'>File upload error(image size must be less than 2 megabytes)</p>
) : filepersent > 0 && filepersent < 100 ? (
  <p className='text-slate-700'>{`Uploading ${filepersent}%`}</p>
) : filepersent === 100 ? (
  <p className='text-green-700'>Image successfully uploaded!</p>
) : null}
                            </span>

        <input
          type='text'
          placeholder='username'
          id='username'
          defaultValue={currentuser.username}
          className='border p-3 rounded-lg'
          onChange={handlechange}

        />
        <input
          type='email'
          defaultValue={currentuser.email}
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
        <button type='submit' className='border p-3 rounded-lg bg-slate-700  text-white '>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
      
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      </div>

  )
}

export default Profile