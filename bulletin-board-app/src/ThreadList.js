import { useState, useEffect } from 'react';
import './App.css';

const ThreadList = () => {

    const [threads, setThreads] = useState([]);
    const [offset_num, setOffset_num] = useState(0);

    useEffect(() => {
        fetch("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=" + offset_num, {
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
                console.log(`エラーコード: ${error.ErrorCode}`);
                console.log(`${error.ErrorMessageJP}`);
                console.log(`${error.ErrorMessageEN}`);
              } else {
                console.log("不明なエラーが発生しました。");
              }
            });
    }, [offset_num])
    

    const threadlist = threads.map(item => <li key={item.id} className="thread__container">{item.title}</li>)

    return (
      <div className="threadList__inner">
        <h2 className="threadList__title">新着スレッド</h2>
        <ul className="threadList__container">{threadlist}</ul>
      </div>
    );
}

export { ThreadList };