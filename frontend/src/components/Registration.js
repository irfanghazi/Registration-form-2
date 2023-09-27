import '../components/style.css'
import { useHistory } from 'react-router-dom';
import React, { useState , useEffect} from "react";
import { postAPI, getAPI} from '../api/api-interface';
import UserDetails from './UserDetails';

export default function App() {
  const history = useHistory();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [age, setAge] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [message, setMessage] = useState(false)
  const [data, setData] = useState('')
  const [input, setInput]= useState(false)


  const countryHandler = (e) => {
    e.preventDefault()
    const value = e.target.value
    setSelectedCountry(value)
    const data = country.find((ele) => ele.name == value)
    getAPI(`/user/get-country-state?_id=${data._id}`).then((res) =>{
      if(res.status == 200){
        const data = res.data.states
        if(data){
          setState(data) 
        }
      }
    })
  }

  const stateHandler = async(e) => {
    const value = e.target.value
    setSelectedState(value)
    const data = state.find((ele) => ele.name == value)
    if(data){
      getAPI(`/user/get-state-city?_id=${data._id}`).then((res) =>{
        if(res.status == 200){
          const data = res.data.city
          if(data){
            setCity(data) 
          }
        }
      })
    }
  }

  const cityHandler = (e) => {
    const value = e.target.value
    setSelectedCity(value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();  
    const data = {
      first_name :firstName,
      last_name: lastName,
      email: email,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      gender:gender,
      dateOfBirth: dateOfBirth,
      age: age
    } 

    
    await postAPI('/user/user-registration', data).then((res) => {
     if(res.status == 200){
      const data = res.data
      console.log(res.data)
      // setData(data)
      // setInput(true)
     
      
     }
    })
   console.log(data) 
  }
  const genderHandler = (e) => {
    console.log(e.target.value)
    const gender = e.target.value
    setGender(gender)
  }

  const DobHandler = (e) => {
    const dob = e.target.value
    setDateOfBirth(dob)
  }
  
  const handleSave = () => {  
    const data = {
      first_name :firstName,
      last_name: lastName,
      email: email,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      gender:gender,
      dateOfBirth: dateOfBirth,
      age: age
    }
    setInput(true)
    history.push('/show-information', {data:data})
    // history.push({path:'/show-information', data})
      
  }
  useEffect(() => {
    if(dateOfBirth){
      
    const birthYear = new Date(dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    setAge(age)
    }

  })
  useEffect(() => {
    getAPI('/user/get-all-country').then((res) => {
      if(res.status == 200){
        const data = res.data.allCountry
        setCountry(data)
      }
    })
  },[])

  return (
    <>
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
         onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        <input
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <select
          className="form-field"
          name="country"
          value={selectedCountry}
          onChange={countryHandler}
          required
        >
          <option value="">Select Country</option>
          {country && country.map((ele) => {
           return  <option value = {ele.name}>{ele.name}</option>
          })}
        </select>
        <select
          className="form-field"
          name="state"
          value={selectedState}
          onChange={stateHandler}
          required
        >
         <option value="">Select State</option>
          {state && state.map((ele) => {
           return  <option value = {ele.name}>{ele.name}</option>
          })}
        </select>
        <select
          className="form-field"
          name="city"
          value={selectedCity}
          onChange={cityHandler}
          required
        >
           <option value="">Select City</option>
          {city && city.map((ele) => {
            return <option value = {ele.name}>{ele.name}</option>
          })}
        </select>
        <div className='gender-form'>
          <span>Gender:</span>
          <label for="male">
            <input type="radio" id="male" name="gender" value='Male' onChange={genderHandler} /> Male
          </label>
          <label for="female">
            <input type="radio" id="female" name="gender" value= 'Female'  onChange={genderHandler} /> Female
          </label>
          <label for="other">
            <input type="radio" id="other" name="gender" value= 'Others'  onChange={genderHandler}/> Other
          </label>
        </div>
        <div>
          <span>D.O.B</span>
          <input
            className="form-field"
            type="date"
            placeholder="Date of Birth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={DobHandler}
          />
        </div>
        <div>
          Age: {age && age ? age: ''}
        </div>
        <button className="form-field" type="submit" onClick={handleSave} >
          Register
        </button>

        {message && (
          <div className="text-center">
          <p className="text-danger">All Feilds are required</p>
        </div>
        )}
      </form>
     {input && <UserDetails data = {data}/>}
    </div>
    </>
  );
}
