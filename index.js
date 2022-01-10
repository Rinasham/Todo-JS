
const onClickAdd = () => {
  // テキストボックスの値を取得、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = ""
  createTask(inputText);
};



// TODOリストに要素を追加する関数
const createTask = (task) => {
  // pタグ生成
  const p = document.createElement("p");
  p.innerText = task;
  p.id = "todo-element"

  // div生成
  const div = document.createElement("div");
  div.className="list-row"

  // liタグ生成
  const li = document.createElement("li");
  li.className="li-tag"

// button生成
  // 完了ボタン
  const completionButton = document.createElement("button");
  completionButton.innerText = "done";
  completionButton.addEventListener("click", ()=> {
    // 押された完了ボタンの先祖タグ（li）をulから削除
    deleteFromIncompleteList(completionButton.closest(".li-tag"));

    //完了した要素(div以下)を取得
    const addTarget = completionButton.closest(".li-tag");
    const text = addTarget.querySelector("#todo-element").innerText;
    // divより下の要素を初期化
    addTarget.firstElementChild.textContent = null;
    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;
    p.id = "todo-element"

  // undo button生成
    const undoButton = document.createElement("button");
    undoButton.addEventListener("click", ()=> {
      // completed task listから要素を削除
      const deleteTarget = undoButton.closest(".li-tag");
      document.getElementById("complete-list").removeChild(deleteTarget);
      // liを取得、pタグのtextを取得
      const undoTarget = undoButton.closest(".li-tag");
      const text = undoTarget.querySelector("#todo-element").innerText;
      // divより下を初期化
      undoTarget.firstElementChild.textContent = null;
      createTask(text);
    })

    undoButton.innerText = "undo";
    // addTargetに追加
    div.appendChild(p);
    div.appendChild(undoButton);
    //completed task listに追加
    document.getElementById("complete-list").appendChild(addTarget);
  }
  )
  // 削除ボタン
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", ()=> {
    // 押された削除ボタンの先祖タグ（li）をulから削除
    deleteFromIncompleteList(deleteButton.closest(".li-tag"));
  })

  div.appendChild(p);
  div.appendChild(completionButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //TODOリストにliを追加
  document.getElementById("incomplete-list").appendChild(li);
};



// TODOリストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

document.getElementById("add-button").addEventListener("click", () => onClickAdd());

