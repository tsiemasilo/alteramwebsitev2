#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 5000
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class SilentTCPServer(socketserver.TCPServer):
    def handle_error(self, request, client_address):
        exc_type, exc_value, exc_traceback = sys.exc_info()
        if exc_type in (BrokenPipeError, ConnectionResetError):
            pass
        else:
            super().handle_error(request, client_address)

if __name__ == '__main__':
    SilentTCPServer.allow_reuse_address = True
    with SilentTCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}/")
        httpd.serve_forever()
