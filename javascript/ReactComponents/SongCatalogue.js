function SongCataloguePage() {
  const [tracks, setTracks] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  React.useEffect(() => {
    //console.log(members[19])
  }, [tracks.length]);

  React.useEffect(() => {
    //console.log(members[19])

    // fetch("/javascript/ReactComponents/tracks.json")
    //   .then(function (response) {
    //     return response;
    //   })
    //   .then(function (data) {
    //     return data.json();
    //   })
    //   .then(function (data) {
        

    //     let filtered_tracks = data.filter((track) =>
    //       track.Song_Name.toLowerCase().includes(searchKeyword.toLowerCase())
    //     );

    //     setTracks(filtered_tracks);
    //   })
    //   .catch((err) => console.log(err));

    try {
      let tracks = localStorage.getItem("tracks") 

      tracks = JSON.parse(tracks)

      let filtered_tracks = tracks.filter((track) =>
            track.Song_Name.toLowerCase().includes(searchKeyword.toLowerCase())
          );
      setTracks(filtered_tracks)
    } catch (error) {
      console.log(error)
    }
  

  }, [searchKeyword]);

  React.useEffect(() => {
    console.log("Member Catalogue Use Effect Running");

    fetch("/javascript/ReactComponents/tracks.json")
      .then(function (response) {
        return response;
      })
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        setTracks(data);
        localStorage.setItem("tracks", JSON.stringify(data))
        document.getElementById("app").innerHTML = html;
      })
      .catch((err) => console.log(err));
  }, []);

  let trackComponents = tracks.map((track) => (
    <TrackCard
      key={track.WDG_ID}
      song_name ={track.Song_Name}
      member_1 = {track.Member1}
    />
  ));

  return (
    <div>
      <div id="searchWrapper">
        <div class="flex">
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="search for a artists"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div
        style={{
          color: "white",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gridRowGap: "5vh",
          gridColumnGap: "5vw",
        }}
      >
       {trackComponents}
      </div>
    </div>
  );
}

function TrackCard({ song_name , member_1 }) {
  return (
    <div className="item" style={{}}>
      <div className="inner">
        <div className="info" style={{ textAlign: "center" }}>
          <h5>{song_name}</h5>
          <p>{member_1}</p>
        </div>
      </div>
      <br />

      <br />
    </div>
  );
}
