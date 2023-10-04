import './App.css';
import { Link, useNavigate } from 'react-router-dom';

const NewThread  = () => {
    const navigate = useNavigate();

    const newThreadPost = () => {
        const newThreadTitle = document.getElementById('thread-title').value;
    
        fetch("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newThreadTitle,
            }),
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
            console.log(data);
            navigate('/');
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
        };

    return (
        <div className="newThread__inner">
            <div className="newThread__container">
                <h2 className="newThread__title">スレッド新規作成</h2>
                <input type="text" id="thread-title" name="thread-title" placeholder="スレッドタイトル"></input>
                <div className="newThread__button-container">
                    <Link to="/" className="newThread__back-button">Topに戻る</Link>
                    <button className='newThread__submit' onClick={ newThreadPost }>作成</button>
                </div>
            </div>
        </div>
    );
}

export default NewThread;