import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2"; // Import SweetAlert2

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true); // Start loading

    // Convert prices to numbers
    data.minPrice = parseFloat(data.minPrice);
    data.maxPrice = parseFloat(data.maxPrice);

    // Ensure postingDate is a valid date
    data.postingDate = new Date(data.postingDate);

    // Map skills to values
    data.skills = selectedOption ? selectedOption.map(option => option.value) : [];

    fetch("http://localhost:3000/v1/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // Log the full result to inspect it
        setLoading(false); // Stop loading

        // Check if the response indicates success
        if (result.ok) {
          Swal.fire({
            title: "Success!",
            text: result.message || "Job Posted Successfully!!!", // Use the message from the response
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: result.message || "Something went wrong, please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // Stop loading in case of error
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
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

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder={"$20K"}
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$120K"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Job posting date</label>
              <input
                type="date"
                placeholder="Ex: 2025-01-16"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select {...register("experienceLevel")} className="create-job-input">
                <option value="">Choose your experience</option>
                <option value="NoExperience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className="block mb-2 text-lg"> Required Skill Sets: </label>
            <Creatable
              className="create-job-input py-4"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company URL here: https://wettrancfer.com"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select {...register("employmentType")} className="create-job-input">
                <option value="">Choose your experience</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-600"
              rows={6}
              placeholder="Job Description"
              defaultValue={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, beatae officia cupiditate sequi "

              }
              {...register("description")}
            />
          </div>

          
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By </label>
lilianemuhoza7@gmail.com
            <input
            
           />
           </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          >
            {loading ? "Posting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
