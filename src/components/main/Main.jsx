import React from 'react';
import dataJson from '../../data.json';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function Main() {
  const [datas, setDatas] = useState(dataJson);
  const [filterList, setFilterList] = useState([]);
  const newSet = [...new Set(filterList)];

  const handleLevel = (str) => {
    setFilterList([...filterList, str]);
    setDatas(
      datas.filter((data) => {
        return data.level == str;
      })
    );
  };

  const handleRole = (str) => {
    setFilterList([...filterList, str]);
    setDatas(
      datas.filter((data) => {
        return data.role == str;
      })
    );
  };

  const handleLanguage = (str) => {
    setFilterList([...filterList, str]);

    setDatas(
      datas.filter((data) => {
       return data.languages.includes(str);
      })
    );
  };

  const handleTools = (str) => {
    setFilterList([...filterList, str]);

    setDatas(
      datas.filter((data) => {
        return data.tools.includes(str);
      })
    );
  };

  const handleClear = ()=> {
    setFilterList([]);
    setDatas(dataJson);
  }

  return (
    <main>
      <div className="container">
        {newSet.length > 0 && (
          <div className="filter-container">
            {newSet.map((filter, index) => {
              return (
                <button key={index} onClick={()=>{
                  setFilterList(filterList.filter((lis, i )=> {
                    return i !== index
                  }))
                }}>
                  <span>{filter} </span>
                  <FaTimes className="close-icon" />
                </button>
              );
            })}
            <div className="clear-btn">
              <button onClick={handleClear}>Clear</button>
            </div>
          </div>
        )}

        <div className="card-wrapper">
          {datas.map((user) => {
            const {
              company,
              contract,
              id,
              languages,
              level,
              location,
              logo,
              position,
              postedAt,
              role,
              tools,
              featured
            } = user;
            return (
              <article key={id} className={featured ? ' card-new card' : 'card'}>
                <div className="img-wrapper">
                  <img src={logo} alt={position} />
                </div>
                <div className="center">
                  <div className="company-info">
                    <h6 className="company-name">{company}</h6>
                    {user.new ? <span className="new">New</span> : ''}
                    {featured ? <span className="feature">Featured</span> : ''}
                  </div>
                  <div className="position-wrapper">
                    <h2 className="position">{position}</h2>
                  </div>
                  <div>
                    <div className="work-features">
                      <span>{postedAt}</span>&#x2022;<span>{contract}</span>&#x2022;
                      <span>{location}</span>
                    </div>
                  </div>
                </div>
                <div className="filter-btn-container">
                  <button onClick={() => handleLevel(level)}>{level}</button>
                  <button onClick={() => handleRole(role)}>{role}</button>

                  {languages.map((lan, index) => (
                    <button onClick={() => handleLanguage(lan)} key={index}>
                      {lan}
                    </button>
                  ))}

                  {tools.map((tool, index) => (
                    <button
                      onClick={() =>
                        handleTools(tool)
                      }
                      key={index}>
                      {tool}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Main;
