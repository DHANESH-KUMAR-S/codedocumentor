# Code Auto Documenter - Flask App

A Flask web application that generates comprehensive documentation for code projects using AI (Gemini API). Now with **folder upload support** and **enhanced documentation display**.

## ✨ New Features

- **📁 Folder Upload**: Upload entire project folders as ZIP files
- **🎨 Enhanced Display**: Beautiful, properly formatted documentation with bold text and clean layout
- **📊 Smart File Detection**: Automatically finds and analyzes code files within folders
- **🚫 Auto-Ignore**: Excludes common folders like `node_modules`, `.git`, `__pycache__`, etc.
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🌙 Dark Mode**: Automatic dark mode support based on system preferences

## 🚀 Features

- **File Upload**: Drag and drop individual files or entire project folders
- **AI-Powered Documentation**: Uses Google's Gemini API to generate comprehensive documentation
- **Multiple Language Support**: Supports 25+ programming languages and file types
- **Real-time Progress**: Shows detailed progress during documentation generation
- **Download & Copy**: Download documentation as Markdown file or copy to clipboard
- **Professional Output**: Clean, well-structured documentation with proper formatting

## 📁 Project Structure

```
codedocumentor/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── styles.css    # Custom CSS styles
    └── js/
        └── script.js     # Frontend JavaScript
```

## 🛠️ Installation

1. **Clone or download the project files**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your Gemini API key** (optional):
   - Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Replace the API key in `app.py` line 13:
     ```python
     GEMINI_API_KEY = "your-api-key-here"
     ```

## 🚀 Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

3. **Upload your code files or folders** and generate documentation!

## 📖 Usage

### Individual Files
1. **Upload Files**: Drag and drop code files or click "Browse Files" to select them
2. **Generate Documentation**: Click "Generate Documentation" to process your files
3. **View Results**: The generated documentation will appear in the output section
4. **Download or Copy**: Use the buttons to download as Markdown or copy to clipboard

### Project Folders
1. **Zip Your Project**: Right-click your project folder and create a ZIP file
2. **Upload ZIP**: Drag and drop the ZIP file or select it via browse
3. **Auto-Analysis**: The system automatically extracts and analyzes all code files
4. **Smart Filtering**: Common folders like `node_modules`, `.git`, etc. are automatically excluded
5. **Generate Documentation**: Click "Generate Documentation" to process the entire project

## 📋 Supported File Types

### Programming Languages
- **JavaScript**: `.js`, `.ts`, `.jsx`, `.tsx`
- **Python**: `.py`
- **Java**: `.java`
- **C/C++**: `.c`, `.cpp`
- **Web**: `.html`, `.css`, `.vue`, `.svelte`
- **PHP**: `.php`
- **Ruby**: `.rb`
- **Go**: `.go`
- **Rust**: `.rs`
- **Scala**: `.scala`
- **Kotlin**: `.kt`
- **Swift**: `.swift`
- **R**: `.r`

### Configuration & Documentation
- **Markdown**: `.md`
- **Text**: `.txt`
- **JSON**: `.json`
- **XML**: `.xml`
- **YAML**: `.yaml`, `.yml`
- **TOML**: `.toml`
- **INI**: `.ini`
- **SQL**: `.sql`

### Scripts
- **Shell**: `.sh`
- **Batch**: `.bat`
- **PowerShell**: `.ps1`

## 🔧 API Endpoints

- `GET /` - Main application page
- `POST /generate-documentation` - Generate documentation from uploaded files/folders
- `POST /download-documentation` - Prepare documentation for download

## ⚙️ Configuration

### File Size Limits
- Maximum file size: 50MB per file/folder
- Maximum total upload size: 50MB

### Auto-Ignored Folders
The system automatically excludes these common folders:
- `.git`, `node_modules`, `__pycache__`
- `.vscode`, `.idea`, `dist`, `build`
- `target`, `bin`, `obj`, `venv`, `env`
- `.DS_Store`, `Thumbs.db`

## 🎨 Documentation Output

The generated documentation includes:

### 📋 Project Overview
- Project purpose and goals
- Technology stack and architecture
- Project structure and organization

### 📚 File Documentation
- Individual file analysis with purpose and functionality
- Key functions and classes with detailed explanations
- Dependencies and external libraries used
- Usage examples with code snippets

### 🚀 Setup and Installation
- Prerequisites and dependencies
- Step-by-step installation instructions
- Configuration requirements

### 💻 Usage Examples
- How to run the project
- Common use cases and scenarios
- Code examples and snippets

### 🔧 API Reference
- Function and class documentation
- Parameter descriptions and types
- Return value explanations
- Error handling and exceptions

### 🤝 Contributing Guidelines
- How to contribute to the project
- Code style and standards
- Testing requirements

## 🛠️ Development

### Running in Development Mode
The app runs in debug mode by default. For production, set:
```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

### Customizing the API
To use a different AI service, modify the `call_gemini_api()` function in `app.py`.

### Adding New File Types
To support additional file types, add them to the `SUPPORTED_EXTENSIONS` set in `app.py`.

## 🔍 Troubleshooting

### Common Issues

1. **"No valid code files found"**
   - Ensure your files have supported extensions
   - Check that files are text-based (not binary)
   - For ZIP files, ensure they contain code files

2. **"API request failed"**
   - Verify your Gemini API key is correct
   - Check your internet connection
   - Ensure the API key has proper permissions

3. **File upload issues**
   - Check file size limits (50MB max)
   - Ensure files are not corrupted
   - For large projects, consider splitting into smaller ZIP files

4. **ZIP file processing errors**
   - Ensure the ZIP file is not password-protected
   - Check that the ZIP contains valid files
   - Try re-zipping the folder if issues persist

### Error Logs
Check the Flask console output for detailed error messages when running in debug mode.

## 📈 Performance Tips

- **Large Projects**: For very large projects, consider uploading individual folders rather than the entire project
- **File Organization**: Well-organized project structures result in better documentation
- **Clean Code**: The AI generates better documentation from well-commented and structured code

## 🤝 Contributing

Feel free to submit issues and enhancement requests! Some areas for improvement:
- Support for more file types
- Custom documentation templates
- Integration with version control systems
- Export to different formats (PDF, HTML, etc.)

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Documenting! 📚✨** 