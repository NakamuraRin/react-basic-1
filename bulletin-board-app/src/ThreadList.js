import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const ThreadList = () => {

    const [threads, setThreads] = useState([]);
    const [thread_offset, setThread_offset] = useState(0);

    useEffect(() => {
        fetch("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=" + thread_offset, {
            method: 'GET'
          })
            .then(response => {
              if (!response.ok) {
                return response.json().then(errorData => {
                  throw errorData;
                });
              }
              return response.json();
            })
            .then(data => {
                setThreads(data);
            })
            .catch(error => {
              if (error.ErrorCode) {
                console.log("エラーコード: " + error.ErrorCode);
                console.log(error.ErrorMessageJP);
                console.log(error.ErrorMessageEN);
              } else {
                console.log("不明なエラーが発生しました。");
              }
            });
    }, [thread_offset])
    

    const threadList = threads.map(item => 
      <li key={item.id}>
        <Link to={`/thread/${item.id}`} state={{ title: item.title }} className="thread__container">
          {item.title}
        </Link>
      </li>
    );

    return (
      <div className="threadList__inner">
        <h2 className="threadList__title">新着スレッド</h2>
        <ul className="threadList__container">{threadList}</ul>
      </div>
    );
}

export default ThreadList;