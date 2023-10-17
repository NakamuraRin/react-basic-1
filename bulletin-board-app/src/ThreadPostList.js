import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './App.css';
import ThreadPostForm from './ThreadPostForm';

const ThreadPostList  = () => {

    const { thread_id } = useParams();
    console.log(thread_id);

    const location = useLocation();
    const { state } = location;
  
    const thread_title = state.title;

    const [posts, setPosts] = useState([]);
    const [post_offset, setPost_offset] = useState(0);

    useEffect(() => {
        fetch("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/" + thread_id + "/posts?offset=" + post_offset, {
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
                setPosts(data.posts);
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
    }, [post_offset])
    
    console.log(posts);

    const threadPost = posts.map(item => 
        <li key={item.id} className='post__container'>{item.post}</li>
    );

    return (
        <>
          <div className="threadPostList__inner">
            <div className="threadPostList__wrapper">
              <h2 className="threadPostList__title">{thread_title}</h2>
              <ul className="threadPostList__container">{threadPost}</ul>
            </div>
            <ThreadPostForm thread_id={ thread_id } />
          </div>
        </>
    );
}

export default ThreadPostList;