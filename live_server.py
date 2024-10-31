from livereload import Server

# Function to serve files and watch for changes
def serve():
    server = Server()

    # Watch files in the 'exercise2024' folder for changes
    server.watch('**/*.html')
    server.watch('**/*.css')
    server.watch('**/*.js')
    server.watch('**/*.json')

    # Serve the 'exercise2024' folder on port 8000 and look for index.html
    server.serve(root='.', port=8000, default_filename='index.html')

if __name__ == '__main__':
    serve()
