//this is for both sigin and sginup using google account 

const Outh = () => {
   handlegoogleauthentication = () => {
  try{
    

  }
  catch(error){
    console.log("you can not log in with google",error)

   }
  return (
    <button type="button" onClick={handlegoogleauthentication} className="bg-red-700  uppercase p-3 rounded-lg text-white hover:opacity-95 ">contlinue with google</button>
  )
}

export default Outh