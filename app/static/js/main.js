// app/static/js/main.js

document.addEventListener('DOMContentLoaded', function () {
    const uploadArea = document.getElementById('upload-area');
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const downloadBtn = document.getElementById('download-btn');
    const progress = document.getElementById('progress');
    const progressBar = progress.querySelector('.progress-bar');
    const container = document.querySelector('.container');

    // Click event for upload button
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection via file input
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadFile(file);
        }
    });

    // Dragover event to highlight upload area
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    // Dragleave event to remove highlight
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    // Drop event to handle file drop
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            uploadFile(file);
        }
    });

    // Function to upload file via AJAX
    function uploadFile(file) {
        // Validate file type
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            displayAlert('Allowed file types are JPG, JPEG, and PNG.', 'danger');
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('file', file);

        // Show progress bar
        progress.style.display = 'block';
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';

        // Disable upload interactions during upload
        uploadButton.disabled = true;
        uploadArea.style.pointerEvents = 'none';

        // Create XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);

        // Update progress
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                const percentComplete = Math.round((e.loaded / e.total) * 100);
                progressBar.style.width = percentComplete + '%';
                progressBar.textContent = percentComplete + '%';
            }
        };

        // Handle response
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === 'success') {
                        console.log('Upload and conversion successful:', response);
                        // Hide progress bar
                        progress.style.display = 'none';
                        progressBar.style.width = '0%';
                        progressBar.textContent = '0%';

                        // Show download button with the download URL
                        downloadBtn.style.display = 'inline-block';
                        downloadBtn.dataset.url = response.download_url;

                        displayAlert('File converted successfully! Click "Download PDF" to retrieve your file.', 'success');
                    } else {
                        console.log('Conversion error:', response);
                        displayAlert(response.message || 'An error occurred during conversion.', 'danger');
                        progress.style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    displayAlert('Invalid server response.', 'danger');
                    progress.style.display = 'none';
                }
            } else {
                let response = {};
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (e) {
                    console.log('Failed to parse JSON response:', xhr.responseText);
                }
                displayAlert(response.message || 'An error occurred during the upload.', 'danger');
                progress.style.display = 'none';
            }
            // Re-enable upload interactions
            uploadButton.disabled = false;
            uploadArea.style.pointerEvents = 'auto';
        };

        xhr.onerror = function () {
            displayAlert('An error occurred during the upload.', 'danger');
            progress.style.display = 'none';
            // Re-enable upload interactions
            uploadButton.disabled = false;
            uploadArea.style.pointerEvents = 'auto';
        };

        // Send the request
        xhr.send(formData);
    }

    // Handle download button click
    downloadBtn.addEventListener('click', () => {
        const downloadUrl = downloadBtn.dataset.url;
        if (downloadUrl) {
            // Initiate the download
            window.location.href = downloadUrl;

            // Hide the download button immediately after initiating the download
            downloadBtn.style.display = 'none';
            downloadBtn.dataset.url = ''; // Clear the download URL

            // Optionally, clear any existing alerts related to previous downloads
            removeExistingAlerts();

            // Display an informational alert to prompt the next action
            displayAlert('You can convert another image now.', 'info');
        }
    });

    // Function to display Bootstrap alerts
    function displayAlert(message, type) {
        // Remove existing alert if any
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert div
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert at the top of the container
        container.insertBefore(alertDiv, container.firstChild);
    }

    // Function to remove existing alerts
    function removeExistingAlerts() {
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
    }
});
