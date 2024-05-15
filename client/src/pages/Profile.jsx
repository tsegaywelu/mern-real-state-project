import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentuser } = useSelector((state) => state.user);
  return (
    <div>

   <h1 className='text-center font-bold text-slate-800 '>Profile</h1>
  <img src={currentuser.avatar} alt="profile" className='mx-auto rounded-full mt-5' />

  <input type="text" className='w-max-lg p-3 mx-auto' placeholder='email'  />


    </div>
  )
}

export default Profile