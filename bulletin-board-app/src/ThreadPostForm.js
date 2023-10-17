import './App.css';

const ThreadPostForm  = ({ thread_id }) => {
  console.log(thread_id);

  const newPost = () => {
    const newPostSentence = document.getElementById('thread-post').value;

    if (!newPostSentence) {
      alert("投稿文を入力してください");
      return;
    }

    fetch("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/" + thread_id + "/posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post: newPostSentence,
        }),
    })
    .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.log(errorData);
            throw errorData;
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      .catch(error => {
        if (error.ErrorCode) {
            if (error.ErrorCode === 400) {
                alert("投稿文を入力してください")
            }
            console.log(`エラーコード: ${error.ErrorCode}`);
            console.log(`${error.ErrorMessageJP}`);
            console.log(`${error.ErrorMessageEN}`);
        } else {
          console.log("不明なエラーが発生しました。");
        }
      });
    };

    return (
        <div className="postForm__container">
          <textarea id="thread-post" name="thread-post" cols="35" rows="6" maxlength="210" placeholder="投稿しよう！" required></textarea>
          <button className="postForm__submit" onClick={ newPost }>投稿</button>
        </div>
    );
}

export default ThreadPostForm;