// List of image file names (you can manually populate this or use server-side scripting)
var files = [];
for (var i = 1; i <= 30; i++) {
    files.push("files (" + i + ").");
}
    
// Function to display the clicked image in the center of the screen
function displayImageInCenter(imageSrc) {
    var overlay = document.createElement("div");
    overlay.id = "imageOverlay";
    
    var img = document.createElement("img");
    img.id = "imageClick";
    img.src = imageSrc;

    var overlay2 = document.createElement("div");
    overlay2.id = "imageOverlay2";
    
    overlay.appendChild(overlay2);
    overlay2.appendChild(img);
    document.body.appendChild(overlay);
    
    // Close the overlay when clicked
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };
}

function displayVideoInCenter(imageSrc) {
    var overlay = document.createElement("div");
    overlay.id = "imageOverlay";
    
    var video = document.createElement("video");
    video.id = "imageClick";
    video.src = imageSrc;
    video.controls = true; 
    
    var overlay2 = document.createElement("div");
    overlay2.id = "imageOverlay2";
    
    overlay.appendChild(overlay2);
    overlay2.appendChild(video);
    document.body.appendChild(overlay);
    
    // Close the overlay when clicked
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };
}
    
// Function to display all images
function foto() {
    var container = document.getElementById("gallery");

    // Hapus semua div yang ada
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Reverse the order of images (from 10 to 1)
    for (var i = files.length - 1; i >= 0; i--) {
        var img = document.createElement("img");
        img.src = "../image/galeri/foto/" + files[i] + "jpg"; // Removed the "JPG" extension here
        img.alt = "- Error 303";;
        img.loading = "lazy"
        img.onclick = function() {
            displayImageInCenter(this.src);
        };
        img.onerror = function() {
            // Remove the image if it fails to load (file not found)
            var parentDiv = this.parentNode;
            parentDiv.parentNode.removeChild(parentDiv); // Remove the parent div
        };
        var div = document.createElement("div")
        div.id = "divImage";
        container.appendChild(div);
        div.appendChild(img);
    }
}

function video() {
    var container = document.getElementById("gallery");

    // Hapus semua div yang ada
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Reverse the order of images (from 10 to 1)
    for (var i = files.length - 1; i >= 0; i--) {
        var video = document.createElement("video");
        video.src = "../image/galeri/video/" + files[i] + "mp4"; // Removed the "JPG" extension here
        video.alt = "- Error 303";;
        video.onclick = function() {
            displayVideoInCenter(this.src);
        };
        video.onerror = function() {
            // Remove the image if it fails to load (file not found)
            var parentDiv = this.parentNode;
            parentDiv.parentNode.removeChild(parentDiv); // Remove the parent div
        };
        var div = document.createElement("div")
        div.id = "divVideo";
        container.appendChild(div);
        div.appendChild(video);
    }
}