import { useState, useEffect } from "react";
export default function ListedJobs({
  searchWords,
  jobs,
  setJobs,
  searchJobs,
  setSearchJobs,
}) {
  useEffect(() => {
    let derJobs = jobs;
    searchWords.forEach((word) => {
      derJobs = derJobs.filter(
        (job) =>
          job.position.toLowerCase().search(word.toLowerCase()) != -1 ||
          job.location.toLowerCase().search(word.toLowerCase()) != -1 ||
          job.languages.join("").toLowerCase().search(word.toLowerCase()) !=
            -1 ||
          job?.tools.join("").toLowerCase().search(word.toLowerCase()) != -1
      );
    });
    // console.log(" derJobs", derJobs);
    setSearchJobs(derJobs);
  }, [searchWords, jobs, setSearchJobs]);
  //
  return (
    <ul className="listed-jobs">
      {/*  */}
      <ListedJobsItems />
      {/*  */}
    </ul>
  );

  function ListedJobsItems() {
    function handleJob(obj) {
      setJobs(
        jobs.map((job) =>
          job.company === obj.company
            ? { ...job, active: job.active === false ? true : false }
            : { ...job }
        )
      );
      console.log("listed jobs", jobs);
    }
    return (
      <>
        {searchWords.length ? (
          searchJobs.map((job) => (
            <li
              key={job.id}
              className={`listed-job ${job.active ? "active" : ""}`}
              onClick={() => handleJob(job)}
            >
              <div className="listed-job--img-container">
                <img
                  src={job.logo}
                  alt="Hiring Company Logo"
                  className="listed-job--img"
                />
              </div>
              <header className="listed-job--header">
                <div className="header--subheadings">
                  <h2 className="heading-2">{job.company}</h2>
                  <h3
                    className="heading-tag"
                    style={{
                      display: `${job.new ? "inline-block" : "none"}`,
                    }}
                  >
                    {job.new ? "New!" : ""}
                  </h3>
                  <h3
                    className="heading-tag featured"
                    style={{
                      display: `${job.featured ? "inline-block" : "none"}`,
                    }}
                  >
                    {job.featured ? "Featured" : ""}
                  </h3>
                </div>
                <h1 className="heading-1">{job.position}</h1>
                <div className="job-info">
                  <p className="job-info--text">{job.postedAt}</p>
                  <p className="job-info--text">{job.contract}</p>
                  <p className="job-info--text">{job.location}</p>
                </div>
              </header>
              <ul className="featured-techs">
                {/*  */}
                <FeaturedTech job={job} />
                {/*  */}
              </ul>
            </li>
          ))
        ) : (
          <></>
        )}
        {!searchWords.length ? (
          jobs.map((job) => (
            <li
              key={job.id}
              className={`listed-job ${job.active ? "active" : ""}`}
              onClick={() => handleJob(job)}
            >
              <div className="listed-job--img-container">
                <img
                  src={job.logo}
                  alt="Hiring Company Logo"
                  className="listed-job--img"
                />
              </div>
              <header className="listed-job--header">
                <div className="header--subheadings">
                  <h2 className="heading-2">{job.company}</h2>
                  <h3
                    className="heading-tag"
                    style={{ display: `${job.new ? "inline-block" : "none"}` }}
                  >
                    {job.new ? "New!" : ""}
                  </h3>
                  <h3
                    className="heading-tag featured"
                    style={{
                      display: `${job.featured ? "inline-block" : "none"}`,
                    }}
                  >
                    {job.featured ? "Featured" : ""}
                  </h3>
                </div>
                <h1 className="heading-1">{job.position}</h1>
                <div className="job-info">
                  <p className="job-info--text">{job.postedAt}</p>
                  <p className="job-info--text">{job.contract}</p>
                  <p className="job-info--text">{job.location}</p>
                </div>
              </header>
              <ul className="featured-techs">
                {/*  */}
                <FeaturedTech job={job} />
                {/*  */}
              </ul>
            </li>
          ))
        ) : (
          <></>
        )}
      </>
    );

    function FeaturedTech({ job }) {
      const { languages, level, role, tools } = job;
      const arr = [...languages, level, role, ...tools];
      //
      return arr.map((item) => (
        <li key={Math.random()} className="featured-tech">
          {item}
        </li>
      ));
    }
  }
}
