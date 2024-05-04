jumlahFoto = 150;
jumlahVideo = 15;



// Daftar gambar Anda (Anda perlu mengisi ini secara manual atau menggunakan server-side script)
var images = [];
var totalImage = images.length
var loadedImages = 0

for (var i = 1; i <= jumlahFoto; i++) {
    images.push("image (" + i + ").jpg");
}

function displayImageInCenter(imageSrc) {
    // Mengekstrak folder tujuan dari imageSrc
    var lastIndex = imageSrc.lastIndexOf('/');
    var folderDestination = imageSrc.substring(0, lastIndex + 1) + "full image/"; // Folder tujuan baru

    var overlay = document.createElement("div");
    overlay.id = "imageOverlay";
    
    var img = document.createElement("img");
    img.id = "imageClick";
    img.src = folderDestination + imageSrc.substring(lastIndex + 1); // Menggabungkan folder tujuan dengan nama file dari imageSrc

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
function foto() {
    var container = document.getElementById("gallery");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Reset totalImage dan loadedImages
    totalImage = 0;
    loadedImages = 0;
    end = 0;

    // Buat variabel untuk menentukan jumlah gambar yang ditampilkan setiap kali
    var batch = 15;
    var index = images.length;

    function loadImages() {
        // Tentukan indeks gambar yang akan dimuat
        end = Math.max(index - batch, -1); // Menghitung dari angka tertinggi ke terendah

        // Muat gambar dalam batch saat halaman di-scroll
        for (var i = index; i > end; i--) { // Menghitung dari angka tertinggi ke terendah
            var img = document.createElement("img");
            img.src = "../image/galeri/foto/" + images[i]; // Ganti dengan path folder gambar Anda
            img.loading = "lazy"; // Tambahkan atribut loading="lazy"
            img.alt = "- Error 303";
            img.onclick = function() {
                displayImageInCenter(this.src);
            };
            img.onerror = function() {
                // Remove the image if it fails to load (file not found)
                totalImage--;
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

    jarakLayarDenganHalaman = window.innerHeight * 1

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
    window.addEventListener("scroll", scrollHandler);

    // Mendefinisikan fungsi untuk memanggil scrollHandler setiap 2 detik sekali
    function callScrollHandlerPeriodically() {
        setInterval(scrollHandler, 1000);
    }

    // Panggil fungsi untuk memulai pemanggilan scrollHandler secara periodik
    callScrollHandlerPeriodically();

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

// FUNCTION VIDEO

// Daftar gambar Anda (Anda perlu mengisi ini secara manual atau menggunakan server-side script)
var files = [];
var totalFile = files.length
var loadedFiles = 0

for (var i = 1; i <= jumlahVideo; i++) {
    files.push("files (" + i + ").jpg");
}

function displayFileInCenter(fileSrc) {
    // Mengekstrak folder tujuan dari fileSrc
    var lastIndex = fileSrc.lastIndexOf('/');
    var folderDestination = fileSrc.substring(0, lastIndex + 1) + "full video/"; // Folder tujuan baru

    var overlay = document.createElement("div");
    overlay.id = "imageOverlay";
    
    var video = document.createElement("video");
    video.id = "imageClick";
    // Mengganti ekstensi file dari jpg ke mp4
    video.src = folderDestination + fileSrc.substring(lastIndex + 1).replace('.jpg', '.mp4');
    // Mengatur properti video
    video.controls = true; // Menampilkan kontrol video
    video.autoplay = true; // Otomatis memulai video ketika dimuat
    video.loop = true; // Mengulang video
    var overlay2 = document.createElement("div");
    overlay2.id = "imageOverlay2";
    overlay.appendChild(overlay2);
    overlay2.appendChild(video);
    // Menambahkan overlay ke body
    document.body.appendChild(overlay);
    
    // Close the overlay when clicked
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };
}



// Fungsi untuk menampilkan gambar secara bertahap saat scrolling
function video() {
    var container = document.getElementById("gallery");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Reset totalImage dan loadedImages
    totalFile = 0;
    loadedFiles = 0;
    end = 0;

    // Buat variabel untuk menentukan jumlah gambar yang ditampilkan setiap kali
    var batch = 15;
    var index = files.length;

    function loadFiles() {
        // Tentukan indeks gambar yang akan dimuat
        end = Math.max(index - batch, -1); // Menghitung dari angka tertinggi ke terendah

        // Muat gambar dalam batch saat halaman di-scroll
        for (var i = index; i > end; i--) {
            var img = document.createElement("img");
            img.src = "../image/galeri/video/" + files[i]; // Ganti dengan path folder gambar Anda
            img.loading = "lazy"; // Tambahkan atribut loading="lazy"
            img.alt = "- Error 303";
            img.onclick = function() {
                displayFileInCenter(this.src);
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
                loadedFiles++;
                console.log(loadedFiles)
                if (loadedFiles === totalFile){
                    checkHeightAndLoadFiles();
                }
            })
        }

        // Update indeks untuk batch berikutnya
        index = end;

        // Hentikan pemantauan saat semua gambar telah dimuat
        if (loadedFiles === totalFile) {
            window.removeEventListener('scroll', scrollHandler);
        }
    }

    jarakLayarDenganHalaman = window.innerHeight * 1

    // Panggil loadImages saat halaman dimuat dan di-scroll
    var scrollHandler = function () {
        // Periksa apakah ketinggian halaman lebih besar dari tinggi layar
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - jarakLayarDenganHalaman)) {
            if (loadedFiles === totalFile){
                loadFiles();
            }
        }
    };
    
    // Tambahkan event listener scroll
    window.addEventListener("scroll", scrollHandler);

    // Mendefinisikan fungsi untuk memanggil scrollHandler setiap 2 detik sekali
    function callScrollHandlerPeriodically() {
        setInterval(scrollHandler, 1000);
    }

    // Panggil fungsi untuk memulai pemanggilan scrollHandler secara periodik
    callScrollHandlerPeriodically();

    function checkHeightAndLoadFiles() {
        var windowHeight = window.innerHeight;
        var bodyHeight = document.body.offsetHeight - jarakLayarDenganHalaman;

        if (bodyHeight <= windowHeight) {
            if (loadedFiles === totalFile){
                loadFiles();
            }
        }
    }
    checkHeightAndLoadFiles();
}