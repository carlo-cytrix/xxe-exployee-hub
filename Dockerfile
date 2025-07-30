# --- Backend stage ---
FROM python:3.11-slim AS backend
WORKDIR /app
COPY backend/ /app
RUN pip install --no-cache-dir flask flask-cors lxml

# --- Frontend stage ---
FROM node:18 AS frontend
WORKDIR /frontend
COPY frontend/ /frontend
RUN npm install && npm run build

# --- Final stage ---
FROM python:3.11-slim
WORKDIR /app
COPY --from=backend /app /app
COPY --from=frontend /frontend/dist /app/static
RUN pip install flask flask-cors lxml
EXPOSE 5000
CMD ["python", "app.py"]
