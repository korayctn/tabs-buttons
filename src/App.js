import { useEffect, useState } from "react";
import { AiOutlineDoubleRight } from 'react-icons/ai'

const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async ()=>{
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data);
    setTimeout(()=>{
      setLoading(false);
    },100)
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="loading-div">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
  const{title,dates,duties,company} = jobs[value];
  let companies = [...new Set(jobs.map((person,index)=>{
    return person.company
  }))]

  console.log(companies);
  return (
      <section className="section">
        <div className="title">
          <h2>Experience</h2>
          <div className="underline"></div>
        </div>
        <div className="jobs-center">
          <div className="btn-container">
            {
              companies.map((company,index)=>{
                return <button key={index} className={`job-btn ${index === value && 'active-btn'}`} onClick={()=>{
                  setValue(index);
                }}>{company}</button>
              })
            }
          </div>
          <article className="job-info">
            <h3>
              {title}
            </h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {duties.map((duty,index)=>{
              return (
                <div key={index} className="job-desc">
                  <AiOutlineDoubleRight className="job-icon"/>
                  <p>{duty}</p>
                </div>
              )
            })}
          </article>
        </div>
      </section>
    );
}

export default App;
