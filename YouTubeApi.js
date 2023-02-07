$(async function() {

    let searchTerm = "";
    let videoList = $("#videoList");
    let apiKey = "AIzaSyAjAbGHvlLm9UlEAVTIIFaZQxkMAYX9OlI";
    let player = $("#player");
    clearVideoList();
    search(searchTerm);
    $("#searchForm").on("submit", (e) => {
        e.preventDefault();
        searchTerm = $("#searchField").val();
        search(searchTerm);
    });
   async function search(q) {
        $.ajax({
            type: "GET",
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${apiKey}`,
            success: function(data) {
              console.log(data.items[0].snippet.title);
            },
            data: {
                key: apiKey,
                q: q,
                part: "snippet",
                maxResults: 10,
                type: "video",
                videoEmbeddable: true,
            },
        }).done((data) => {
          //localStorage.setItem("videoListData", JSON.stringify(data));
            let videos = data.items;
            clearVideoList();
            videos.forEach((el) => {
                //add channelTitle
                // add video id to li element
                videoList.append(`<li loading="lazy" onclick="$('html, body').animate({ scrollTop: 0 }, 'slow');" class="media mb-2" id="${el.id.videoId}">
                <img loading="lazy" src="${el.snippet.thumbnails.medium.url}" class="mr-3">
                <div class="media-body">
                  <h5 class="card-title mt-0 mb-1">${el.snippet.title}</h5>
                  <h6 class="my-1 text-info">${el.snippet.channelTitle}</h6>
                </div>
              </li>`);
            });
            let video = data.items[0];
            play(video.id.videoId, video.snippet.title,
                video.snippet.channelTitle);

        }).fail(function(data) {
            console.log(data);
        });
    }

    function clearVideoList() {
        videoList.find(".media").remove();
    }

   async function play(id, title, channelTitle) {
        player.attr("src", `https://www.youtube.com/embed/${id}?enablejsapi=1?&vq=small`);
        $("#video-title").text(title);
        $("#video-channelTitle").text(channelTitle);
        
    }

    //select the video
    videoList.on("click", "li", function() {
        let id = $(this).attr("id");
        findVideoById(id);
    });

    //find video by id
   async function findVideoById(id) {
        $.ajax({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos",
            
            data: {
                key: apiKey,
                id: id,
                part: "snippet",
                
            }
            
        }).done((data) => {
            let video = data.items[0];
            let snippet = video.snippet;
            play(id, snippet.title, snippet.channelTitle)
        }).fail((data) => {
            console.log(data);
        });
    }
    
    
    
});

