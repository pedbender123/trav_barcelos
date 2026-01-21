FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Initialize DB during build
RUN python seed.py

EXPOSE 4002

CMD ["python", "app.py"]
