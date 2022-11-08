async function addGame() {
  const gameInfo = document.getElementsByClassName("newGameInfoInput")
  if (!gameInfo || gameInfo.length < 1 ) {
    return closeModal()
  }

  if (gameInfoIsInvalid(gameInfo)) {
    return
  }

  const data = {
    imageLink: gameInfo[0].value,
    link: gameInfo[1].value,
    gameName: gameInfo[2].value
  }

  const lista = document.getElementsByClassName("games-list");

  const gameElement = createGameElement(data);

  lista[0].appendChild(gameElement);

  const previousLocalStorage = JSON.parse(localStorage.getItem("games")) ?? [];

  localStorage.setItem(
    "games",
    JSON.stringify([...previousLocalStorage, data])
  );

  closeModal()
}

function gameInfoIsInvalid(gameInfo) {
  let hasWrongInfo

  for (info of gameInfo) {
    if (!info.value || info.value.length < 1) {
      hasWrongInfo = true
      info.style.border = "1px solid red"
      continue
    }
    info.style.border = "none"
  }

  if (hasWrongInfo) {
    return true
  }
}

function createGameElement(data) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");

  a.target = "_blank";
  a.href = data.gameLink;

  img.src = data.imageLink;
  img.alt = `Imagem do jogo ${data.gameName}`;

  a.appendChild(img);
  li.appendChild(a);

  return li;
}

const setLocalStorageGames = (games) => {
  const lista = document.getElementsByClassName("games-list");

  for (game of games) {
    lista[0].appendChild(createGameElement(game));
  }
};

window.onload = () => {
  const games = JSON.parse(localStorage.getItem("games"));


  if (games) {
    setLocalStorageGames(games);
  }
};

function openModal() {
  const modal = window.document.getElementById('chama')

  modal.style.display = "flex"
}

function closeModal() {
  const modal = window.document.getElementById('chama')

  modal.style.display = "none"
}