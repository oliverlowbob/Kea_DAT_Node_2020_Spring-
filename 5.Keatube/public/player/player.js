
// todo console.log the path variable!!!
const fullUrl = window.location.href;
const videoId = fullUrl.substr(fullUrl.lastIndexOf("/") + 1);




$.get(`../videos/${videoId}`)
    .done((response) => {
        $(".title").text(response.response.title);

        const player = `<video id="player" width="320" height="240" controls>
                    <source src="/${videoId}">
                    Your browser does not support the video tag.
                </video>`;

        $("#player-wrapper").append(player);

        $(".description").text(response.response.description);
    })
    .catch((error) => {
        console.log(error);
        $(".title").text("Could not find video");
});
