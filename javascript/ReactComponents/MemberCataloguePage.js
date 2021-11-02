function MemberCataloguePage() {

  const [members, setMembers] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState("");


  React.useEffect(() => {
    //console.log(members[19])
  }, [members.length]);

  React.useEffect(() => {
    //console.log(members[19])



    fetch("javascript/ReactComponents/Members.json")
      .then(function (response) {
        return response;
      })
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        setMembers(data);

        let filtered_members = data.filter(
          member => member.member_name.toLowerCase().includes(searchKeyword.toLowerCase())
        )

        setMembers(filtered_members)

      })
      .catch((err) => console.log(err));

  }, [searchKeyword]);


  React.useEffect(() => {

    console.log("Member Catalogue Use Effect Running");


    fetch("javascript/ReactComponents/Members.json")
      .then(function (response) {
        return response;
      })
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        setMembers(data);
        document.getElementById("app").innerHTML = html;
      })
      .catch((err) => console.log(err));


  }, []);

  let memberComponents = members.map((member) => (
    <MemberCard
      key={member.member_name}
      name={member.member_name}
      imageURL={member.image}
      type={member.artist_type}
    />
  ));

  return (
    <div>
      <div id="searchWrapper">
        <div class="flex">
          <input type="text" name="searchBar" id="searchBar" placeholder="search for a artists" value={searchKeyword} onChange={(e) => { setSearchKeyword(e.target.value) }}/>
          <button type="submit"><i class="fa fa-search"></i></button>
        </div>
      </div>
      <div class="row">
        <div class="team-items">
        {
          memberComponents
        }
</div>
      </div>
    </div>
  );
}

function MemberCard({ name, imageURL, type }) {
  return (
    <div class="item" >
              <img alt={`${name} profile picture`} src={`images/artist_photos/${imageURL}`}/>
      <div class="inner">


        <div class="info">
          <h5>{name}</h5>
          <p>{type}</p>
          <div class="social-links"></div>
        </div>
      </div>
    </div>
  );
}
