const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.Name.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("Asset/Json/Members.json");
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

      <div class="item">
      <image src="images/artist_photos/${character.image}"
          style="height:261px; width:251px; object-fit: fit; " alt="team" />
      <div class="inner">
          <div class="info">
              <h5>${character.Member_Name}</h5>
              <p>${character.Column1}</p>
              <div class="social-links">

              </div>
          </div>
      </div>
  </div>

        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
