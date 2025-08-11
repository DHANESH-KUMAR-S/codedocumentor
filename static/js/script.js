// Dark mode setup
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Global variables
let selectedFiles = [];
let generatedDocumentation = '';

// Supported file extensions
const SUPPORTED_EXTENSIONS = [
    'js', 'py', 'java', 'cpp', 'c', 'html', 'css', 'php', 'rb', 'go', 'rs', 'ts', 
    'jsx', 'tsx', 'vue', 'svelte', 'md', 'txt', 'json', 'xml', 'yaml', 'yml', 
    'toml', 'ini', 'sh', 'bat', 'ps1', 'sql', 'r', 'scala', 'kt', 'swift', 'zip'
];

// Custom alert function
function showAlert(title, message, type = 'info') {
    const modal = document.getElementById('alertModal');
    const icon = document.getElementById('alertIcon');
    const titleEl = document.getElementById('alertTitle');
    const messageEl = document.getElementById('alertMessage');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    icon.className = `text-4xl mb-4 ${type === 'error' ? 'fas fa-exclamation-circle text-red-500' : 
                                    type === 'success' ? 'fas fa-check-circle text-green-500' : 
                                    'fas fa-info-circle text-blue-500'}`;
    
    modal.classList.remove('hidden');
}

document.getElementById('alertOkBtn').onclick = () => {
    document.getElementById('alertModal').classList.add('hidden');
};

// File upload handling
const fileDropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const fileItems = document.getElementById('fileItems');
const generateSection = document.getElementById('generateSection');

fileDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropZone.classList.add('dragover');
});

fileDropZone.addEventListener('dragleave', () => {
    fileDropZone.classList.remove('dragover');
});

fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    selectedFiles = Array.from(files).filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return SUPPORTED_EXTENSIONS.includes(extension);
    });

    if (selectedFiles.length === 0) {
        showAlert('No Valid Files', 'Please select code files or ZIP folders with supported extensions.', 'error');
        return;
    }

    // Check if any ZIP files are included
    const zipFiles = selectedFiles.filter(file => file.name.toLowerCase().endsWith('.zip'));
    if (zipFiles.length > 0) {
        showAlert('Folder Upload Detected', 
            `Found ${zipFiles.length} ZIP file(s). The system will automatically extract and analyze all code files within these folders.`, 
            'info');
    }

    displayFileList();
    fileList.classList.remove('hidden');
    generateSection.classList.remove('hidden');
}

function displayFileList() {
    fileItems.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded border';
        
        const isZip = file.name.toLowerCase().endsWith('.zip');
        const icon = isZip ? 'fas fa-folder-zip' : 'fas fa-file-code';
        const size = (file.size / 1024).toFixed(1);
        const sizeText = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${size} KB`;
        
        fileItem.innerHTML = `
            <div class="flex items-center">
                <i class="${icon} text-primary mr-3"></i>
                <div>
                    <span class="font-medium">${file.name}</span>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                        ${sizeText} ${isZip ? '(Folder)' : ''}
                    </div>
                </div>
            </div>
            <button onclick="removeFile(${index})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        `;
        fileItems.appendChild(fileItem);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFileList();
    
    if (selectedFiles.length === 0) {
        fileList.classList.add('hidden');
        generateSection.classList.add('hidden');
    }
}

// Documentation generation
document.getElementById('generateBtn').addEventListener('click', generateDocumentation);

async function generateDocumentation() {
    if (selectedFiles.length === 0) {
        showAlert('No Files Selected', 'Please select files to generate documentation.', 'error');
        return;
    }

    const progressSection = document.getElementById('progressSection');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const outputSection = document.getElementById('outputSection');

    progressSection.classList.remove('hidden');
    outputSection.classList.add('hidden');
    
    try {
        // Create FormData for file upload
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        progressText.textContent = 'Uploading files to server...';
        progressBar.style.width = '20%';

        // Send files to Flask backend
        const response = await fetch('/generate-documentation', {
            method: 'POST',
            body: formData
        });

        progressText.textContent = 'Analyzing files and generating documentation...';
        progressBar.style.width = '60%';

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to generate documentation');
        }

        progressText.textContent = 'Finalizing documentation...';
        progressBar.style.width = '90%';

        // Display results
        setTimeout(() => {
            progressBar.style.width = '100%';
            progressText.textContent = `Documentation generated successfully! Processed ${result.files_processed || 'multiple'} files.`;
            
            setTimeout(() => {
                progressSection.classList.add('hidden');
                displayDocumentation(result.documentation);
            }, 1000);
        }, 500);

    } catch (error) {
        progressSection.classList.add('hidden');
        showAlert('Generation Failed', error.message, 'error');
    }
}

function displayDocumentation(documentation) {
    generatedDocumentation = documentation;
    const contentDiv = document.getElementById('documentationContent');
    
    // Since we're now getting HTML directly from the server, we can insert it directly
    contentDiv.innerHTML = documentation;
    
    // Add custom styling for better formatting
    const headings = contentDiv.querySelectorAll('h1, h2, h3, h4');
    headings.forEach(heading => {
        heading.classList.add('documentation-heading');
    });
    
    // Add syntax highlighting to code blocks if they exist
    const codeBlocks = contentDiv.querySelectorAll('pre code');
    codeBlocks.forEach(codeBlock => {
        // Add a class for styling
        codeBlock.classList.add('syntax-highlighted');
    });
    
    // Show the output section
    document.getElementById('outputSection').classList.remove('hidden');
    
    // Scroll to output
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth' });
}

// Copy functionality
document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedDocumentation).then(() => {
        showAlert('Copied!', 'Documentation has been copied to clipboard.', 'success');
    }).catch(() => {
        showAlert('Copy Failed', 'Failed to copy documentation to clipboard.', 'error');
    });
});

// Download functionality
document.getElementById('downloadBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/download-documentation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                documentation: generatedDocumentation
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to prepare download');
        }

        // Create and download the file
        const blob = new Blob([generatedDocumentation], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project-documentation.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showAlert('Downloaded!', 'Documentation has been saved as project-documentation.md', 'success');
    } catch (error) {
        showAlert('Download Failed', error.message, 'error');
    }
}); 