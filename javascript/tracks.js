const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.Song_Name.toLowerCase().includes(searchString) ||
      character.Member1.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("Asset/Json/tracks.json");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
    
  const htmlString = characters
    .map((character) => {
      return `
      <div class="card">
      <li class="character">

        <div class="cat_title">
            <img src="Images/icons8-musical.png">
            <h2>${character.Song_Name}</h2>
        </div>
      
        <div class="cat_row">
                  <div Class="cat_col60">    
                      <p><b>Member :</b>  ${character.Member1}</p>
                      <p><b>Member :</b>  ${character.Member2}</p>
                  </div>
                  <div class="cat_col40">
                      <p><b>ID:</b>  ${character.WDG_ID}</p>
                      <p><b>Copyright:</b>  ${character.Presentage}</p>
                  </div>
          </div>
      
          <p><b>Other Contributions:</b>  ${character.OC1}, ${character.OC2} ${character.OC3} ${character.OC4}</p>
      
      
        </li>      
  </div>

        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
