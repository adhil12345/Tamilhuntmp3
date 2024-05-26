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
                        <button class="btn btn-play" onclick="${isGoogleDrive ? 'openGoogleDriveFile' : 'togglePlayStop'}('${downloadLink}', this)">${isGoogleDrive ? 'Play' : 'Play'}</button>
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
                    playButton.classList.remove('btn-stop');
                    playButton.classList.add('btn-play');
                }
                return;
            }

            // Stop the currently playing song
            if (currentSong !== null) {
                var currentPlayButton = document.querySelector('.btn-stop');
                if (currentPlayButton) {
                    currentPlayButton.textContent = 'Play';
                    currentPlayButton.classList.remove('btn-stop');
                    currentPlayButton.classList.add('btn-play');
                }
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }

            // Start loading the new song
            currentSong = songUrl;
            audioPlayer.src = songUrl;
            playButton.innerHTML = '<img style="width:10px;" src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"/>';
            audioPlayer.play();

            // Add event listener for 'playing' event
            audioPlayer.addEventListener('playing', function onPlaying() {
                playButton.textContent = 'Stop';
                playButton.classList.remove('btn-play');
                playButton.classList.add('btn-stop');
                audioPlayer.removeEventListener('playing', onPlaying);
            });

            // Add event listener for 'ended' event
            audioPlayer.addEventListener('ended', function onEnded() {
                currentSong = null;
                playButton.textContent = 'Play';
                playButton.classList.remove('btn-stop');
                playButton.classList.add('btn-play');
                audioPlayer.removeEventListener('ended', onEnded);
            });
        }

        // Function to open download link in new tab
        function openDownload(downloadUrl) {
            // For Google Drive download links, construct the direct download link
            if (downloadUrl.includes('drive.google.com')) {
                var fileId = extractGoogleDriveFileId(downloadUrl);
                downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
            }
            window.open(downloadUrl, '_blank');
        }

        // Function to extract file ID from Google Drive download link
        function extractGoogleDriveFileId(url) {
            var match = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
            return match ? match[1] : null;
        }

        // Function to open Google Drive file
        function openGoogleDriveFile(googleDriveLink, button) {
            if (button.classList.contains('btn-download')) {
                // If the action is triggered from the download button, directly download the file
                openDownload(googleDriveLink);
            } else {
                // If the action is triggered from the play button, open the Google Drive link
                window.open(googleDriveLink, '_blank');
            }
        }

        // Call the function to populate the table
        populateTable();
