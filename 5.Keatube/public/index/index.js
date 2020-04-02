$.get("videos?page=1", (response) => {
    response.response.map((video) => {
        $("#video-gallery").append(`<li><a href="/player/${video.fileName}">${video.title}</a></li>`)
    });
});



