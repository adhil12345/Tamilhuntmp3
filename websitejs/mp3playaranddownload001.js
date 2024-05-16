var currentSong = null;

    // Function to dynamically create table rows
    function populateTable() {
        var tableBody = document.querySelector('#songTable tbody');
        tableBody.innerHTML = '';

        var songDataDiv = document.querySelector('.songData');
        var songDivs = songDataDiv.querySelectorAll('div');

        songDivs.forEach(function(songDiv, index) {
            var name = songDiv.getAttribute('data-name');
            var size = songDiv.getAttribute('data-size');
            var downloadLink = songDiv.getAttribute('data-download-link');

            var row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding-inline-start: 10px;"> ${name}</td>
                <td>${size}</td>
                <td>
                    <button class="btn btn-download" onclick="openDownloadLink('${downloadLink}')">Download</button>
                    <button class="btn btn-play" onclick="togglePlayStop('${downloadLink}', this)">Play</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to play or stop song
    function togglePlayStop(songUrl, button) {
        var audioPlayer = document.getElementById('audioPlayer');
        var playButton = button;
        
        // If the clicked song is already playing, pause it
        if (currentSong === songUrl) {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                playButton.textContent = 'Play';
            }
            return;
        }

        // Stop the currently playing song
        if (currentSong !== null) {
            var currentPlayButton = document.querySelector('.btn-stop');
            var currentAudioPlayer = document.getElementById('audioPlayer');
            currentPlayButton.textContent = 'Play';
            currentAudioPlayer.pause();
            currentAudioPlayer.currentTime = 0;
        }

        // Start playing the new song
        currentSong = songUrl;
        audioPlayer.src = songUrl;
        audioPlayer.play();
        playButton.textContent = 'Stop';
        playButton.classList.remove('btn-play');
        playButton.classList.add('btn-stop');

        // Handle song end event
        audioPlayer.addEventListener('ended', function() {
            currentSong = null;
            playButton.textContent = 'Play';
            playButton.classList.remove('btn-stop');
            playButton.classList.add('btn-play');
        });
    }

    // Function to open download link in new tab
    function openDownloadLink(songUrl) {
        window.open(songUrl, '_blank');
    }

    // Call the function to populate the table
    populateTable();
