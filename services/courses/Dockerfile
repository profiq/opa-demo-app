FROM python:3-alpine

RUN mkdir /app && [ ! -d /app/share ] && mkdir /app/share
COPY . /app

COPY data.json /app/share

WORKDIR /app

RUN pip install -r requirements.txt
ENV FLASK_APP server.py

# flask is not production server
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000", "--with-threads"]