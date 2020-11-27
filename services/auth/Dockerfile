FROM python:3-alpine

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt
ENV FLASK_APP server.py

# flask is not production server
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5001", "--with-threads"]