import axios from 'axios'

function Login() {
  const handleClick = () => axios.post('')

  return (
    <>
      <div>Log in.</div>
      <input placeholder="Your Email Address"></input>
      <input placeholder="Your Password"></input>
      <button onClick={handleClick}>Log in</button>
    </>
  )
}

export default Login
