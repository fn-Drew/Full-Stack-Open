CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, title, url) VALUES ('Michael Chan', 'React patterns', 'https://reactpatterns.com/');
