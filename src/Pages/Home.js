import React, { useEffect, useState } from "react";
import "./mix.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [cities, setCities] = useState([]);
  const [location, setCity] = useState(null);

  const history = useNavigate();

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
  });

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const setVal = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      age = Math.max(age, 0);
      setInput({
        ...input,
        dob: value,
        age: age,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };

  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
    cities = [...new Set(cities.map((item) => item))];
    console.log("this is cities", cities);
    setCities(cities);
  };

  const handleCity = (e) => {
    const selectedCity = e.target.value;
    let City = data.find((item) => item.name == selectedCity);
    setCity(City);
    console.log(location, "this is location");
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, gender, dob, age } = input;
    console.log(firstname, lastname, email);
    if (firstname === "") {
      toast.error("please enter your name");
      return;
    } else if (!firstname.trim() || !/^[a-zA-Z]+$/.test(firstname)) {
      toast.error(
        "Please enter a valid first name containing only alphabetic characters"
      );
      return;
    } else if (lastname === "") {
      toast.error("please enter your  last name");
      return;
    } else if (!lastname.trim() || !/^[a-zA-Z]+$/.test(lastname)) {
      toast.error(
        "Please enter a valid last name containing only alphabetic characters"
      );
      return;
    } else if (email === "") {
      toast.error("please enter your email");
      return;
    } 
    else if (!email.includes( "gmail" )) {
      toast.error("enter valid email");
      return;
    }
    else if (!input.gender) {
      toast.error("Please select your gender");
    } else if (age < 14 || age > 99) {
      toast.error("Age must be between 14 and 99 years");
    } else {
      const data = await fetch("http://localhost:8000/users/formFill", {
        method: "POST",
        headers: {
          "content-type": "application/Json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          gender,
          dob,
          age,
          location,
        }),
      });

      const res = await data.json();
      console.log(res, "this is res");
      if (res.status === 201) {
        toast.success("user registration successfully");
        setTimeout(() => {
          history(`profile/${res.info._id}`);
        }, 3000);

        setInput({
          ...input,
          firstname: "",
          lastname: "",
          email: "",
          dob: "",
          gender: "",
          age: "",
          location: "",
        });
      } else if (res.error === "user already exist") {
        toast.error("Email already exists");
      }
    }
  };

  useEffect(() => {
    const getFunction = async () => {
      const fetchData = await fetch(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      );
      const finalData = await fetchData.json();
      setData(finalData);
    };

    getFunction();
  }, []);

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Register</h1>
            <p style={{ textAlign: "center" }}>fill all the details</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name"> First Name</label>
              <input
                type="name"
                name="firstname"
                id="name"
                placeholder="enter your first name"
                value={input.firstname}
                onChange={setVal}
              />
            </div>

            <div className="form_input">
              <label htmlFor="email"> Last Name</label>
              <input
                type="name"
                name="lastname"
                id="lastname"
                placeholder="enter your last name"
                value={input.lastname}
                onChange={setVal}
              />
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter your email address"
                value={input.email}
                onChange={setVal}
              />
            </div>

            <div>
              <label>Location</label>
              <div className="form_location">
                <label htmlFor="country"> Country</label>
                <select className="select" onChange={(e) => handleCountry(e)}>
                  <option  value="">select country</option>
                  {country.map((item) => (
                    <option key={item} value={getCountry}>
                      {item}
                    </option>
                  ))}
                </select>

                <label htmlFor="country"> State</label>
                <select className="select" onChange={(e) => handleState(e)}>
                  <option value="">select state</option>
                  {getState.map((item) => (
                    <option key={item} value={selectedState}>
                      {item}
                    </option>
                  ))}
                </select>

                <label htmlFor=""> Cities</label>
                <select className="select" onChange={(e) => handleCity(e)}>
                  <option value="">select city</option>
                  {cities.map((item) => (
                    <option key={item.geonameid} value={location}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "19px" }}>
              <label
                style={{ fontWeight: 600, fontSize: "15px" }}
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="radio_button">
                <div className="radio_button_options">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={input.gender === "male"}
                    onChange={setVal}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="radio_button_options">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={input.gender === "female"}
                    onChange={setVal}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="radio_button_options">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={input.gender === "other"}
                    onChange={setVal}
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="date">Date Of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder="enter your age"
                value={input.dob}
                onChange={setVal}
              />
            </div>
            <div className="form_input">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                id="age"
                value={input.age}
                readOnly
              />
            </div>
            <button className="btn" onClick={addUserdata}>
              Sign up
            </button>
          </form>
          <ToastContainer autoClose={3000}  />
        </div>
      </section>
    </>
  );
};

export default Register;
