// // List of image file names (you can manually populate this or use server-side scripting)
// var files = [];
// for (var i = 1; i <= 40; i++) {
//     files.push("files (" + i + ").");
// }
    
// // Function to display the clicked image in the center of the screen
// function displayImageInCenter(imageSrc) {
//     var overlay = document.createElement("div");
//     overlay.id = "imageOverlay";
    
//     var img = document.createElement("img");
//     img.id = "imageClick";
//     img.src = imageSrc;

//     var overlay2 = document.createElement("div");
//     overlay2.id = "imageOverlay2";
    
//     overlay.appendChild(overlay2);
//     overlay2.appendChild(img);
//     document.body.appendChild(overlay);
    
//     // Close the overlay when clicked
//     overlay.onclick = function() {
//         document.body.removeChild(overlay);
//     };
// }

// function displayVideoInCenter(imageSrc) {
//     var overlay = document.createElement("div");
//     overlay.id = "imageOverlay";
    
//     var video = document.createElement("video");
//     video.id = "imageClick";
//     video.src = imageSrc;
//     video.controls = true; 
    
//     var overlay2 = document.createElement("div");
//     overlay2.id = "imageOverlay2";
    
//     overlay.appendChild(overlay2);
//     overlay2.appendChild(video);
//     document.body.appendChild(overlay);
    
//     // Close the overlay when clicked
//     overlay.onclick = function() {
//         document.body.removeChild(overlay);
//     };
// }
    
// // Function to display all images
// function foto() {
//     var container = document.getElementById("gallery");

//     // Hapus semua div yang ada
//     while (container.firstChild) {
//         container.removeChild(container.firstChild);
//     }
    
//     // Reverse the order of images (from 10 to 1)
//     for (var i = files.length - 1; i >= 0; i--) {
//         var img = document.createElement("img");
//         img.src = "../image/galeri/foto/" + files[i] + "jpg"; // Removed the "JPG" extension here
//         img.alt = "- Error 303";
//         img.loading = "lazy";
//         img.onclick = function() {
//             displayImageInCenter(this.src);
//         };
//         img.onerror = function() {
//             // Remove the image if it fails to load (file not found)
//             var parentDiv = this.parentNode;
//             parentDiv.parentNode.removeChild(parentDiv); // Remove the parent div
//         };
//         var div = document.createElement("div")
//         div.id = "divImage";
//         container.appendChild(div);
//         div.appendChild(img);
//     }
// }

// function video() {
//     var container = document.getElementById("gallery");

//     // Hapus semua div yang ada
//     while (container.firstChild) {
//         container.removeChild(container.firstChild);
//     }
    
//     // Reverse the order of images (from 10 to 1)
//     for (var i = files.length - 1; i >= 0; i--) {
//         var video = document.createElement("video");
//         video.src = "../image/galeri/video/" + files[i] + "mp4"; // Removed the "JPG" extension here
//         video.alt = "- Error 303";;
//         video.onclick = function() {
//             displayVideoInCenter(this.src);
//         };
//         video.onerror = function() {
//             // Remove the image if it fails to load (file not found)
//             var parentDiv = this.parentNode;
//             parentDiv.parentNode.removeChild(parentDiv); // Remove the parent div
//         };
//         var div = document.createElement("div")
//         div.id = "divVideo";
//         container.appendChild(div);
//         div.appendChild(video);
//     }
// }



// Daftar gambar Anda (Anda perlu mengisi ini secara manual atau menggunakan server-side script)
var images = [];
var totalImage = images.length
var loadedImages = 0

for (var i = 1; i <= 209; i++) {
    images.push("image (" + i + ").JPG");
}

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

// Fungsi untuk menampilkan gambar secara bertahap saat scrolling
function displayImages() {
    var container = document.getElementById("gallery");

    while (container.firstChild) {
    container.removeChild(container.firstChild);
    }

    // Buat variabel untuk menentukan jumlah gambar yang ditampilkan setiap kali
    var batch = 15;
    var index = 0;

    function loadImages() {
        // Tentukan indeks gambar yang akan dimuat
        end = Math.min(index + batch, images.length);

        // Muat gambar dalam batch saat halaman di-scroll
        for (var i = index; i < end; i++) {
            var img = document.createElement("img");
            img.src = "../../image/acara/pekan kemerdekaan/hari-1/" + images[i]; // Ganti dengan path folder gambar Anda
            img.loading = "lazy"; // Tambahkan atribut loading="lazy"
            img.alt = "- Error 303";
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
            totalImage++;
            container.appendChild(div);
            div.appendChild(img);
            img.addEventListener("load", function(){
                loadedImages++;
                console.log(loadedImages)
                if (loadedImages === totalImage){
                    checkHeightAndLoadImages();
                }
            })
        }

        // Update indeks untuk batch berikutnya
        index = end;

        // Hentikan pemantauan saat semua gambar telah dimuat
        if (loadedImages === totalImage) {
            window.removeEventListener('scroll', scrollHandler);
        }
    }

    jarakLayarDenganHalaman = window.innerHeight * 0.5

    // Panggil loadImages saat halaman dimuat dan di-scroll
    var scrollHandler = function () {
        // Periksa apakah ketinggian halaman lebih besar dari tinggi layar
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - jarakLayarDenganHalaman)) {
            if (loadedImages === totalImage){
                loadImages();
            }
        }
    };
    
    // Tambahkan event listener scroll
    window.addEventListener("scrollend", scrollHandler);
    window.addEventListener("scroll", scrollHandler);

    function checkHeightAndLoadImages() {
        var windowHeight = window.innerHeight;
        var bodyHeight = document.body.offsetHeight - jarakLayarDenganHalaman;

        if (bodyHeight <= windowHeight) {
            if (loadedImages === totalImage){
                loadImages();
            }
        }
    }
    checkHeightAndLoadImages();
}