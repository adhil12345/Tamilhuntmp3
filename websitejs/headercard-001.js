    // Wait for the document to be fully loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Find the h1 element
        var h1Element = document.querySelector('.post-title');
        
        // Extract the title text
        var titleText = h1Element.textContent.trim();
        var titleH1 = titleText.split("(")[0];
        var titleStarring = titleText.split(")")[1].split(",")[0];
        var titlemusicd = titleText.split(",")[1].split(",")[0];
        var titleDirector = titleText.split(",")[2].split("|")[0];
        var titleDate = titleText.split("(")[1].split(")")[0];
        
        var imageseperator = '"';
        
        var findImg = document.querySelectorAll(".separator")[0].innerHTML.split(imageseperator)[1]
        
        // Find the first image in the content
        var firstImage = document.querySelector('.post-title img');
        var imageUrl = firstImage ? firstImage.src : ''; // Get the image URL if exists
        
        // Create a new div element
        var divElement = document.createElement('div');
        divElement.className = 'post-title'; // Copy the original class
        
        // Set the title text as the content of the new div
        // divElement.textContent = titleText;
        
        // Replace the h1 element with the new div
        h1Element.parentNode.replaceChild(divElement, h1Element);
        
        // Add the section inside the created div
        var sectionHTML = `
            <div class="bnneerMainbox" id="">
                <div class="banner-for-mp3download">
                    <div class="left-section-for-mp3download">
                        <h1><span style="color: #eeeeee; text-transform: uppercase;">${titleH1}</span></h1>
                        <p class="cast-crew-for-movies">Starring: ${titleStarring}</p>
                        <p class="cast-crew-for-movies">Music: ${titlemusicd}</p>
                        <p class="cast-crew-for-movies">Director: ${titleDirector}</p>
                        <p class="cast-crew-for-movies">Year: ${titleDate}</p>
                        <p class="url-for-website"><a href="#">www.tamilhuntmp3.blogspot.com</a></p>
                    </div>
                    <div class="right-section-for-mp3download">
                        <!--Add pixelated profile images here-->
                        <img alt="Profile 1" id="movieImgcover" src="${findImg}" style="box-shadow: 4px 5px 4px black; height: auto; width: 64%;" />
                    </div>
                </div>
            </div>`;
        
        // Append the section inside the new div
        divElement.innerHTML += sectionHTML;
    });
