import { createContext, useState } from "react";


export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const [userData,setUserData]=useState({
        name:"Siddhant Shrestha",
        email:"siddhantstha10@gmail.com",
        image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        number:"090909",
        address:{
            line1:"balaju",
            line2:"kathmandu"
        },
        gender:"male",
        dob:"2062-11-17"

    })
    const [account,setAccount]=useState(false)
    const AllDoctors = [
        {
            id:"01",
            Name: "Aadesh Khadka",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "5 years",
            Speciality: "Cardiology",
            Degree: "MBBS, MD (Cardiology)",
            Fees: "$100",
            Description: "Expert in heart-related diseases and treatments."
        },
        {
            id:"02",
            Name: "Sita Sharma",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "8 years",
            Speciality: "Neurology",
            Degree: "MBBS, MD (Neurology)",
            Fees: "$120",
            Description: "Specialist in brain and nervous system disorders."
        },
        {
            id:"03",
            Name: "Ram Bahadur",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "12 years",
            Speciality: "Orthopedics",
            Degree: "MBBS, MS (Orthopedics)",
            Fees: "$90",
            Description: "Expert in bone and joint treatments."
        },
        {
            id:"04",
            Name: "Anisha Koirala",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "6 years",
            Speciality: "Pediatrics",
            Degree: "MBBS, MD (Pediatrics)",
            Fees: "$80",
            Description: "Specialist in child healthcare and development."
        },
        {
            id:"05",
            Name: "Bishal Tamang",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "10 years",
            Speciality: "Dermatology",
            Degree: "MBBS, MD (Dermatology)",
            Fees: "$110",
            Description: "Expert in skin, hair, and nail diseases."
        },
        {
            id:"06",
            Name: "Sarita Thapa",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "9 years",
            Speciality: "Oncology",
            Degree: "MBBS, MD (Oncology)",
            Fees: "$130",
            Description: "Specialist in cancer treatments."
        },
        {
            id:"07",
            Name: "Manoj Gurung",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "7 years",
            Speciality: "Psychiatry",
            Degree: "MBBS, MD (Psychiatry)",
            Fees: "$100",
            Description: "Expert in mental health and psychological disorders."
        },
        {
            id:"08",
            Name: "Krishna Adhikari",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "15 years",
            Speciality: "Gastroenterology",
            Degree: "MBBS, MD (Gastroenterology)",
            Fees: "$140",
            Description: "Specialist in digestive system disorders."
        },
        {
            id:"09",
            Name: "Rekha Bhandari",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "11 years",
            Speciality: "Obstetrics and Gynecology",
            Degree: "MBBS, MD (Gynecology)",
            Fees: "$120",
            Description: "Expert in women’s health and pregnancy care."
        },
        {
            id:"10",
            Name: "Rajesh Mahat",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "14 years",
            Speciality: "Endocrinology",
            Degree: "MBBS, MD (Endocrinology)",
            Fees: "$125",
            Description: "Specialist in hormone-related disorders."
        },
        {
            id:"11",
            Name: "Kabita Raut",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "13 years",
            Speciality: "Ophthalmology",
            Degree: "MBBS, MD (Ophthalmology)",
            Fees: "$95",
            Description: "Expert in eye diseases and vision correction."
        },
        {
            id:"12",
            Name: "Binod Rai",
            image: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
            Experience: "5 years",
            Speciality: "Pulmonology",
            Degree: "MBBS, MD (Pulmonology)",
            Fees: "$110",
            Description: "Specialist in lung diseases and respiratory conditions."
        }
    ];
    const [selectedSpecialty,setSelectedSpecialty]=useState({})

    const value={
        AllDoctors,
        selectedSpecialty,setSelectedSpecialty,account,setAccount,
        userData,setUserData
        
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider