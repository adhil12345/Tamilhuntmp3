    var currentSong = null;

    // Function to dynamically create table rows
    function populateTable() {
        var tableBody = document.querySelector('#songTable tbody');
        tableBody.innerHTML = '';

        var songDataDiv = document.querySelector('.songData');
        var songDivs = songDataDiv.querySelectorAll('div');

        songDivs.forEach(function (songDiv, index) {
            var name = songDiv.getAttribute('data-name');
            var size = songDiv.getAttribute('data-size');
            var downloadLink = songDiv.getAttribute('data-download-link');
            var isGoogleDrive = songDiv.getAttribute('data-google-drive') === "true";

            var row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding-inline-start: 10px;"> ${name}</td>
                <td>${size}</td>
                <td>
                    <button class="btn btn-download" onclick="openDownload('${downloadLink}')">Download</button>
                    <button class="btn btn-play" onclick="${isGoogleDrive ? 'openGoogleDriveFile' : 'togglePlayStop'}('${downloadLink}')">${isGoogleDrive ? 'Play' : 'Play/Stop'}</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to play or stop song
    function togglePlayStop(songUrl) {
        var audioPlayer = document.getElementById('audioPlayer');

        // If the clicked song is already playing, pause it
        if (currentSong === songUrl) {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }
            return;
        }

        // Stop the currently playing song
        if (currentSong !== null) {
            var currentAudioPlayer = document.getElementById('audioPlayer');
            currentAudioPlayer.pause();
            currentAudioPlayer.currentTime = 0;
        }

        // Start playing the new song
        currentSong = songUrl;
        audioPlayer.src = songUrl;
        audioPlayer.play();

        // Handle song end event
        audioPlayer.addEventListener('ended', function () {
            currentSong = null;
        });
    }

    // Function to open download link in new tab
    function openDownload(downloadUrl) {
        window.open(downloadUrl, '_blank');
    }

    // Function to open Google Drive file in new tab
    function openGoogleDriveFile(googleDriveLink) {
        window.open(googleDriveLink, '_blank');
    }

    // Call the function to populate the table
    populateTable();
