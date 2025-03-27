import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable"

const CreateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null)
const {
register,
handleSubmit,reset,
formState: { errors },
} = useForm();

const onSubmit = (data) => {
    data.skills = selectedOption;
// console.log(data);
fetch("https://jobs-backend-pdfb.onrender.com/post-job", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
})
.then(res => res.json())
.then((result)=>{
console.log(result)
if(result.acknowledged === true){
    alert("job posted Successfully!!!")
}
reset()
})
};
const options = [
    {value: "Javascript", label: "Javascript"},
    {value: "C++", label: "C++"},
    {value: "HTML", label: "HTML"},
    {value: "CSS", label: "CSS"},
    {value: "Reacr", label: "React"},
    {value: "Node", label: "Node"},
    {value: "MongoDB", label: "MongoDB"},
    {value: "Redux", label: "Redux"},
]

return (
<div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
<div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    <div className="flex flex-col lg:flex-row items-center gap-8">
    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Job title</label>
        <input
        type="text"
        defaultValue={"Web Developer"}
        {...register("jobTitle")}
        className="create-job-input"
        />
    </div>

    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Company Name</label>
        <input
        type="text"
        placeholder="Ex: Microsoft"
        {...register("companyName")}
        className="create-job-input"
        />
    </div>
    </div>

    <div className="create-job-flex">
    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Mainisum Salary</label>
        <input
        type="text"
        placeholder="$20k"
        {...register("minPrice")}
        className="create-job-input"
        />
    </div>

    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Maxisum Salary</label>
        <input
        type="text"
        placeholder="$120k"
        {...register("maxPrice")}
        className="create-job-input"
        />
    </div>
    </div>

    <div className="create-job-flex">
    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Salary Type</label>
        <select {...register("SalaryType")} className="create-job-input">
        <option value="">Choose your salary</option>
        <option value="hourly">Hourly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>

    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Job Location</label>
        <input
        type="text"
        placeholder="Ex: New York"
        {...register("jobLocation")}
        className="create-job-input"
        />
    </div>
    </div>

    <div className="create-job-flex">

    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Job posting Date</label>
        <input
        type="date"
        placeholder="Ex: 2023-10-28"
        {...register("postingDate")}
        className="create-job-input"
        />
    </div>

    <div className="lg:w-1/2 w-full">
        <label className="block mb-2 text-lg">Expereince Level</label>
        <select {...register("ExpereinceLevel")} className="create-job-input">
        <option value="">Choose your expereince</option>
        <option value="NoExpereince">Hourly</option>
        <option value="Intership">Intership</option>
        <option value="Work remotely">Work remotely</option>
      </select>
    </div>

   
    </div>

    <div>
    <label className="block mb-2 text-lg">Required Skills Sets</label>
    <CreatableSelect 
    defaultValue={selectedOption}
    onChange={setSelectedOption}
    options={options}
    isMulti
    className="create-job-input py-4"/>
    </div>

    <div className="create-job-flex">

<div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Company Logo</label>
    <input
    type="url"
    placeholder="Paste you company logo URL: http://weshar.com/imag1"
    {...register("companyLogo")}
    className="create-job-input"
    />
</div>

<div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Employment Type</label>
    <select {...register("employmentType")} className="create-job-input">
    <option value="">Choose your expereince</option>
    <option value="Full-time">Full-time</option>
    <option value="Part-time">Part-time</option>
    <option value="Temporary">Temporary</option>
  </select>
</div>
</div>

<div className="w-full">
<label className="block mb-2 text-lg">Job Description</label>
<textarea  className="w-full pl-3 py-1.5 focus:outline-none"
rows={6}
defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
placeholder="job Description"
{...register("description")}/>
</div>

<div className="w-full">
<label className="block mb-2 text-lg">Job posted by</label>
<input
        type="email"
        placeholder="your email"
        {...register("postedBy")}
        className="create-job-input"
        />
</div>

    <input type="submit" className="block mt-12 bg-orange-500 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
</form>
</div>
</div>


);
};

export default CreateJob;
